import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const API = "https://kallumalaiyan-backend.onrender.com"

const emptyForm = {
  name: "",
  category: "",
  description: "",
  price: "80",
  promoDiscount: "",
  imageBWFiles: [],
  imageBWPreviews: [],
  isHotSelling: false,
  isNewArrival: false,
  isRecommended: false,
}

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [page, setPage] = useState("orders")
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [newCategoryDesc, setNewCategoryDesc] = useState("")
  const [newCategoryImage, setNewCategoryImage] = useState(null)
  const [newCategoryPreview, setNewCategoryPreview] = useState(null)
  const [adminProductSort, setAdminProductSort] = useState("newest")
  const [adminProductCategory, setAdminProductCategory] = useState("All")
  const [editingCategory, setEditingCategory] = useState(null)
  const [editCategoryImage, setEditCategoryImage] = useState(null)
  const [editCategoryPreview, setEditCategoryPreview] = useState(null)
  const [editCategoryDesc, setEditCategoryDesc] = useState("")
  const [changePwForm, setChangePwForm] = useState({ current: "", newPw: "", confirm: "" })
  const [changePwMsg, setChangePwMsg] = useState("")
  const [changePwError, setChangePwError] = useState("")
  const [showChangePw, setShowChangePw] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem("ksa-admin-auth")
    if (auth === "true") setIsLoggedIn(true)
    fetchOrders()
    fetchProducts()
    fetchCategories()
  }, [])

  const handleLogin = async () => {
    try {
      const res = await fetch(API + "/api/settings/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (data.success) {
        sessionStorage.setItem("ksa-admin-auth", "true")
        setIsLoggedIn(true)
        setLoginError("")
      } else {
        setLoginError(data.error || "Wrong password! Try again.")
      }
    } catch (err) {
      setLoginError("Error connecting to server. Try again!")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("ksa-admin-auth")
    setIsLoggedIn(false)
  }

  const handleChangePassword = async () => {
    setChangePwError("")
    setChangePwMsg("")
    if (!changePwForm.current || !changePwForm.newPw || !changePwForm.confirm) {
      setChangePwError("Please fill in all fields!")
      return
    }
    if (changePwForm.newPw !== changePwForm.confirm) {
      setChangePwError("New passwords do not match!")
      return
    }
    if (changePwForm.newPw.length < 6) {
      setChangePwError("New password must be at least 6 characters!")
      return
    }
    try {
      const res = await fetch(API + "/api/settings/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: changePwForm.current,
          newPassword: changePwForm.newPw
        })
      })
      const data = await res.json()
      if (data.success) {
        setChangePwMsg("Password changed successfully!")
        setChangePwForm({ current: "", newPw: "", confirm: "" })
        setTimeout(() => setShowChangePw(false), 2000)
      } else {
        setChangePwError(data.error || "Failed to change password!")
      }
    } catch (err) {
      setChangePwError("Error connecting to server!")
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch(API + "/api/orders")
      const data = await res.json()
      setOrders(data)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch(API + "/api/products")
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err) }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(API + "/api/categories")
      const data = await res.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err) }
  }

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return
    try {
      const formData = new FormData()
      formData.append("name", newCategory.trim())
      formData.append("description", newCategoryDesc.trim())
      if (newCategoryImage) formData.append("image", newCategoryImage)
      const res = await fetch(API + "/api/categories", { method: "POST", body: formData })
      const data = await res.json()
      if (data.categories) {
        setCategories(data.categories)
        setMessage("Category added: " + newCategory.trim())
        setNewCategory("")
        setNewCategoryDesc("")
        setNewCategoryImage(null)
        setNewCategoryPreview(null)
        setShowAddCategory(false)
      } else {
        setMessage("Error: " + data.error)
      }
    } catch (err) { setMessage("Error: " + err.message) }
  }

  const handleDeleteCategory = async (cat) => {
    try {
      const res = await fetch(API + "/api/categories/" + encodeURIComponent(cat), { method: "DELETE" })
      const data = await res.json()
      if (data.categories) {
        setCategories(data.categories)
        setMessage("Category removed: " + cat)
      }
    } catch (err) { setMessage("Error removing category") }
  }

  const handleUpdateCategory = async () => {
    try {
      const formData = new FormData()
      formData.append("name", editingCategory.name)
      formData.append("description", editCategoryDesc)
      if (editCategoryImage) formData.append("image", editCategoryImage)
      const res = await fetch(API + "/api/categories/update", { method: "POST", body: formData })
      const data = await res.json()
      if (data.categories) {
        setCategories(data.categories)
        setMessage("Category updated!")
        setEditingCategory(null)
        setEditCategoryImage(null)
        setEditCategoryPreview(null)
        setEditCategoryDesc("")
      } else {
        setMessage("Error: " + data.error)
      }
    } catch (err) { setMessage("Error: " + err.message) }
  }

  const openAddForm = () => {
    setForm(emptyForm)
    setEditingProduct(null)
    setShowForm(true)
  }

  const openEditForm = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      description: product.description || "",
      price: product.price || 80,
      promoDiscount: product.promoDiscount || "",
      imageBWFiles: [],
      imageBWPreviews: product.imagesBW && product.imagesBW.length > 0
        ? product.imagesBW
        : product.imageBW ? [product.imageBW] : [],
      isHotSelling: product.isHotSelling || false,
      isNewArrival: product.isNewArrival || false,
      isRecommended: product.isRecommended || false,
    })
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.category) {
      setMessage("Please fill in name and category!")
      return
    }
    setSaving(true)
    setMessage("")
    try {
      const url = editingProduct
        ? API + "/api/products/" + editingProduct._id
        : API + "/api/products"
      const method = editingProduct ? "PUT" : "POST"
      const formData = new FormData()
      formData.append("name", form.name)
      formData.append("category", form.category)
      formData.append("description", form.description)
      formData.append("price", form.price || 80)
      formData.append("promoDiscount", form.promoDiscount || "")
      formData.append("isHotSelling", String(form.isHotSelling))
      formData.append("isNewArrival", String(form.isNewArrival))
      formData.append("isRecommended", String(form.isRecommended))
      if (form.imageBWFiles && form.imageBWFiles.length > 0) {
        form.imageBWFiles.forEach(file => formData.append("imageBW", file))
      }
      const res = await fetch(url, { method, body: formData })
      const data = await res.json()
      if (data._id) {
        setMessage(editingProduct ? "Product updated!" : "Product added!")
        setShowForm(false)
        fetchProducts()
      } else {
        setMessage("Error: " + data.error)
      }
    } catch (err) { setMessage("Error: " + err.message) }
    setSaving(false)
  }

  const handleDelete = async (productId, productName) => {
    const confirmed = window.confirm("Delete " + productName + "?")
    if (!confirmed) return
    try {
      await fetch(API + "/api/products/" + productId, { method: "DELETE" })
      setMessage("Product deleted!")
      fetchProducts()
    } catch (err) { setMessage("Error deleting product") }
  }

  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm("Delete this order permanently?")
    if (!confirmed) return
    try {
      await fetch(API + "/api/orders/" + orderId, { method: "DELETE" })
      setOrders(prev => prev.filter(o => o._id !== orderId))
      setMessage("Order deleted!")
    } catch (err) { setMessage("Error deleting order") }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(API + "/api/orders/" + orderId + "/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      })
      const data = await res.json()
      if (data._id) {
        setOrders(prev => prev.map(o => o._id === data._id ? { ...o, status: data.status } : o))
        setMessage("Status updated to: " + newStatus)
      }
    } catch (err) { setMessage("Error updating status") }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "delivered": return { background: "#EAF3DE", color: "#3B6D11" }
      case "posted":    return { background: "#E6F1FB", color: "#0C447C" }
      case "accepted":  return { background: "#FAEEDA", color: "#854F0B" }
      case "paid":      return { background: "#EAF3DE", color: "#3B6D11" }
      default:          return { background: "#F5F3EF", color: "#3D3830" }
    }
  }

  const getProductImage = (product) => {
    if (product.imagesBW && product.imagesBW.length > 0) return product.imagesBW[0]
    if (product.imageBW) return product.imageBW
    if (product.images && product.images.length > 0) return product.images[0]
    return product.image || null
  }

  const getFilteredSortedProducts = () => {
    let filtered = [...products]
    if (adminProductCategory !== "All") {
      filtered = filtered.filter(p => p.category === adminProductCategory)
    }
    switch (adminProductSort) {
      case "oldest": filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break
      case "az":     filtered.sort((a, b) => a.name.localeCompare(b.name)); break
      case "za":     filtered.sort((a, b) => b.name.localeCompare(a.name)); break
      default:       filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    return filtered
  }

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "#F5F3EF"
      }}>
        <div style={{
          background: "white", padding: "40px",
          borderRadius: "12px", border: "1px solid #E8E2D9",
          width: "100%", maxWidth: "380px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)"
        }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <p style={{ fontSize: "24px", fontWeight: "600", color: "#1A1714", marginBottom: "4px" }}>
              KSA Admin
            </p>
            <p style={{ fontSize: "13px", color: "#8B7355" }}>
              Kallumalaiyan SketchArt Dashboard
            </p>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Enter your password"
              style={inputStyle}
            />
          </div>
          {loginError && (
            <div style={{
              background: "#FCEBEB", color: "#A32D2D",
              padding: "10px 14px", borderRadius: "6px",
              fontSize: "13px", marginBottom: "16px"
            }}>
              {loginError}
            </div>
          )}
          <button onClick={handleLogin} style={{
            width: "100%", padding: "12px",
            background: "#1A1714", color: "white",
            border: "none", borderRadius: "6px",
            fontSize: "14px", cursor: "pointer"
          }}>
            Login
          </button>
          <p style={{ textAlign: "center", fontSize: "11px", color: "#8B7355", marginTop: "20px" }}>
            Protected area - Kallumalaiyan SketchArt
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px", background: "#1A1714",
        padding: "24px 16px", display: "flex",
        flexDirection: "column", gap: "4px", flexShrink: 0
      }}>
        <p style={{ color: "#C4A882", fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>
          KSA Admin
        </p>
        <p style={{ color: "#8B7355", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "24px" }}>
          DASHBOARD
        </p>
        {[
          { id: "orders", label: "Orders" },
          { id: "products", label: "Products" },
          { id: "categories", label: "Categories" },
        ].map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{
            padding: "10px 14px",
            background: page === item.id ? "rgba(255,255,255,0.1)" : "transparent",
            color: "#FAF8F4", border: "none", borderRadius: "6px",
            cursor: "pointer", fontSize: "13px", textAlign: "left"
          }}>
            {item.label}
          </button>
        ))}
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link to="/" style={{ color: "#8B7355", fontSize: "12px", textDecoration: "none" }}>
            Back to Site
          </Link>
          <button onClick={() => setShowChangePw(true)} style={{
            padding: "8px 14px", background: "transparent",
            color: "#8B7355", border: "1px solid #3D3830",
            borderRadius: "6px", cursor: "pointer",
            fontSize: "12px", textAlign: "left"
          }}>
            Change Password
          </button>
          <button onClick={handleLogout} style={{
            padding: "8px 14px", background: "transparent",
            color: "#8B7355", border: "1px solid #3D3830",
            borderRadius: "6px", cursor: "pointer",
            fontSize: "12px", textAlign: "left"
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "32px", background: "#F5F3EF", overflowY: "auto" }}>

        {message && (
          <div style={{
            padding: "12px 16px", borderRadius: "6px", marginBottom: "16px",
            background: message.includes("Error") ? "#FCEBEB" : "#EAF3DE",
            color: message.includes("Error") ? "#A32D2D" : "#3B6D11",
            fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            {message}
            <button onClick={() => setMessage("")} style={{
              background: "none", border: "none", cursor: "pointer", fontSize: "18px"
            }}>x</button>
          </div>
        )}

        {/* ORDERS */}
        {page === "orders" && (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "400", marginBottom: "24px" }}>Orders</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
              {[
                { label: "TOTAL ORDERS", value: orders.length },
                { label: "REVENUE", value: "RM " + orders.reduce((s, o) => s + (o.total || 0), 0) },
                { label: "PENDING", value: orders.filter(o => o.status === "pending").length },
                { label: "DELIVERED", value: orders.filter(o => o.status === "delivered").length },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: "white", border: "1px solid #E8E2D9",
                  borderRadius: "8px", padding: "16px"
                }}>
                  <p style={{ fontSize: "11px", color: "#8B7355", letterSpacing: "0.1em", marginBottom: "6px" }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: "26px", fontWeight: "500" }}>{stat.value}</p>
                </div>
              ))}
            </div>
            {loading ? (
              <p style={{ color: "#8B7355" }}>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p style={{ color: "#8B7355" }}>No orders yet!</p>
            ) : (
              <div style={{ background: "white", border: "1px solid #E8E2D9", borderRadius: "8px", overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "#FAF8F4" }}>
                      {["Customer", "Phone", "Address", "Items", "Total", "Status", "Date", ""].map(h => (
                        <th key={h} style={thStyle}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} style={{ borderBottom: "1px solid #F0EDE8" }}>
                        <td style={tdStyle}>
                          <p style={{ fontWeight: "500" }}>{order.customer.name}</p>
                          <p style={{ fontSize: "11px", color: "#8B7355" }}>{order.customer.email}</p>
                        </td>
                        <td style={tdStyle}>{order.customer.phone}</td>
                        <td style={tdStyle}>
                          <p style={{ fontSize: "11px" }}>{order.customer.address}</p>
                          <p style={{ fontSize: "11px", color: "#8B7355" }}>
                            {order.customer.city}, {order.customer.postcode}
                          </p>
                          <p style={{ fontSize: "11px", color: "#8B7355" }}>{order.customer.state}</p>
                        </td>
                        <td style={tdStyle}>
                          {order.items.map((item, i) => (
                            <p key={i} style={{ fontSize: "11px", color: "#3D3830", marginBottom: "2px" }}>
                              {item.name} - {item.size} x{item.qty}
                            </p>
                          ))}
                        </td>
                        <td style={tdStyle}>
                          <p style={{ fontWeight: "500" }}>RM {order.total}</p>
                        </td>
                        <td style={tdStyle}>
                          <select
                            value={order.status}
                            onChange={e => updateOrderStatus(order._id, e.target.value)}
                            style={{
                              padding: "6px 10px", fontSize: "11px",
                              borderRadius: "6px", border: "1px solid #E8E2D9",
                              cursor: "pointer", fontFamily: "inherit",
                              fontWeight: "500", outline: "none",
                              ...getStatusStyle(order.status)
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="accepted">Accepted</option>
                            <option value="posted">Posted</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td style={tdStyle}>
                          <p style={{ fontSize: "11px" }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                          <p style={{ fontSize: "11px", color: "#8B7355" }}>{new Date(order.createdAt).toLocaleTimeString()}</p>
                        </td>
                        <td style={tdStyle}>
                          <button
                            onClick={() => handleDeleteOrder(order._id)}
                            style={{
                              background: "none", border: "1px solid #F7C1C1",
                              color: "#A32D2D", padding: "4px 10px",
                              borderRadius: "4px", cursor: "pointer", fontSize: "11px"
                            }}
                          >Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* PRODUCTS */}
        {page === "products" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "400" }}>Products</h2>
              <button onClick={openAddForm} style={{
                background: "#1A1714", color: "white", border: "none",
                padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontSize: "13px"
              }}>+ Add Product</button>
            </div>

            {showForm && (
              <div style={{
                background: "white", border: "1px solid #E8E2D9",
                borderRadius: "8px", padding: "24px", marginBottom: "24px"
              }}>
                <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "20px" }}>
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Product Name</label>
                    <input name="name" value={form.name} onChange={handleFormChange}
                      placeholder="e.g. Lord Murugan Portrait" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Category</label>
                    <select name="category" value={form.category} onChange={handleFormChange} style={inputStyle}>
                      <option value="">Select category</option>
                      {categories.map(cat => {
                        const name = typeof cat === "string" ? cat : cat.name
                        return <option key={name} value={name}>{name}</option>
                      })}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Base Price (RM)</label>
                    <input name="price" value={form.price || "80"} onChange={handleFormChange}
                      placeholder="80" type="number" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Discount % — Leave empty if no promo</label>
                    <input name="promoDiscount" value={form.promoDiscount || ""}
                      onChange={handleFormChange} placeholder="e.g. 10 for 10% off"
                      type="number" min="1" max="99" style={inputStyle} />
                    {form.promoDiscount && (
                      <p style={{ fontSize: "11px", color: "#E8572A", marginTop: "4px" }}>
                        {form.promoDiscount}% discount active!
                      </p>
                    )}
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Description / Order comes with</label>
                    <textarea name="description" value={form.description} onChange={handleFormChange}
                      placeholder="Describe this product..." rows={3}
                      style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Product Pictures (up to 5)</label>
                    <input type="file" accept="image/*" multiple
                      onChange={e => {
                        const files = Array.from(e.target.files).slice(0, 5)
                        setForm({ ...form, imageBWFiles: files, imageBWPreviews: files.map(f => URL.createObjectURL(f)) })
                      }}
                      style={{ ...inputStyle, padding: "8px" }} />
                    <p style={{ fontSize: "11px", color: "#8B7355", marginTop: "4px" }}>
                      First image is the main display photo. Select up to 5 images.
                    </p>
                    {form.imageBWPreviews && form.imageBWPreviews.length > 0 && (
                      <div style={{ marginTop: "10px" }}>
                        <p style={{ fontSize: "11px", color: "#8B7355", marginBottom: "6px" }}>
                          Preview ({form.imageBWPreviews.length} image{form.imageBWPreviews.length > 1 ? "s" : ""}):
                        </p>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {form.imageBWPreviews.map((src, i) => (
                            <div key={i} style={{ position: "relative" }}>
                              <img src={src} alt={"preview " + i} style={{
                                width: "72px", height: "90px", objectFit: "contain",
                                borderRadius: "6px", background: "#F5F5F5",
                                border: i === 0 ? "2px solid #1A1714" : "1px solid #E8E2D9"
                              }} />
                              {i === 0 && (
                                <span style={{
                                  position: "absolute", bottom: "4px", left: 0, right: 0,
                                  textAlign: "center", fontSize: "9px",
                                  background: "rgba(0,0,0,0.6)", color: "white",
                                  padding: "2px 0", borderRadius: "0 0 4px 4px"
                                }}>Main</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Product Tags</label>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      {[
                        { key: "isHotSelling", label: "Hot Selling" },
                        { key: "isNewArrival", label: "New Arrival" },
                        { key: "isRecommended", label: "Recommended" },
                      ].map(tag => (
                        <label key={tag.key} style={{
                          display: "flex", alignItems: "center", gap: "8px",
                          cursor: "pointer", fontSize: "13px", color: "#3D3830"
                        }}>
                          <input type="checkbox" checked={form[tag.key] || false}
                            onChange={e => setForm({ ...form, [tag.key]: e.target.checked })}
                            style={{ width: "16px", height: "16px", accentColor: "#1A1714" }} />
                          {tag.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                  <button onClick={handleSave} disabled={saving} style={{
                    background: "#1A1714", color: "white", border: "none",
                    padding: "10px 24px", borderRadius: "6px",
                    cursor: saving ? "not-allowed" : "pointer", fontSize: "13px"
                  }}>
                    {saving ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                  </button>
                  <button onClick={() => setShowForm(false)} style={{
                    background: "white", color: "#1A1714", border: "1px solid #E8E2D9",
                    padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontSize: "13px"
                  }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Filter & Sort Bar */}
            <div style={{
              display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap",
              alignItems: "center", padding: "12px 16px", background: "white",
              border: "1px solid #E8E2D9", borderRadius: "8px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <label style={{ fontSize: "12px", color: "#8B7355" }}>Category:</label>
                <select value={adminProductCategory}
                  onChange={e => setAdminProductCategory(e.target.value)}
                  style={{ padding: "6px 10px", border: "1px solid #E8E2D9",
                    borderRadius: "4px", fontSize: "13px", fontFamily: "inherit", outline: "none" }}>
                  <option value="All">All Categories</option>
                  {categories.map(cat => {
                    const name = typeof cat === "string" ? cat : cat.name
                    return <option key={name} value={name}>{name}</option>
                  })}
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <label style={{ fontSize: "12px", color: "#8B7355" }}>Sort:</label>
                <select value={adminProductSort}
                  onChange={e => setAdminProductSort(e.target.value)}
                  style={{ padding: "6px 10px", border: "1px solid #E8E2D9",
                    borderRadius: "4px", fontSize: "13px", fontFamily: "inherit", outline: "none" }}>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="az">A to Z</option>
                  <option value="za">Z to A</option>
                </select>
              </div>
              <p style={{ fontSize: "12px", color: "#8B7355", marginLeft: "auto" }}>
                {getFilteredSortedProducts().length} products
              </p>
            </div>

            {getFilteredSortedProducts().length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px", color: "#8B7355" }}>
                <p style={{ fontSize: "18px", marginBottom: "16px" }}>No products found!</p>
                <button onClick={openAddForm} style={{
                  background: "#1A1714", color: "white", border: "none",
                  padding: "12px 24px", borderRadius: "6px", cursor: "pointer"
                }}>Add your first product</button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                {getFilteredSortedProducts().map(product => (
                  <div key={product._id} style={{
                    background: "white", border: "1px solid #E8E2D9",
                    borderRadius: "8px", overflow: "hidden"
                  }}>
                    <div style={{
                      height: "160px", background: "#F5F5F5", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      overflow: "hidden", position: "relative"
                    }}>
                      {getProductImage(product) ? (
                        <img src={getProductImage(product)} alt={product.name}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      ) : (
                        <span style={{ fontSize: "13px", color: "#ccc" }}>No Image</span>
                      )}
                      <div style={{ position: "absolute", top: "6px", right: "6px", display: "flex", gap: "4px", flexWrap: "wrap" }}>
                        {product.isHotSelling && (
                          <span style={{ background: "#FEE2E2", color: "#DC2626", fontSize: "9px", padding: "2px 6px", borderRadius: "10px" }}>HOT</span>
                        )}
                        {product.isNewArrival && (
                          <span style={{ background: "#DCFCE7", color: "#16A34A", fontSize: "9px", padding: "2px 6px", borderRadius: "10px" }}>NEW</span>
                        )}
                        {product.promoDiscount && (
                          <span style={{ background: "#FEE2E2", color: "#DC2626", fontSize: "9px", padding: "2px 6px", borderRadius: "10px" }}>{product.promoDiscount}% OFF</span>
                        )}
                      </div>
                    </div>
                    <div style={{ padding: "12px" }}>
                      <p style={{ fontWeight: "500", fontSize: "14px", marginBottom: "2px" }}>{product.name}</p>
                      <p style={{ fontSize: "12px", color: "#8B7355", marginBottom: "4px" }}>{product.category}</p>
                      <p style={{ fontSize: "12px", color: "#8B7355", marginBottom: "8px" }}>
                        RM {product.price}
                        {product.promoDiscount && (
                          <span style={{ marginLeft: "6px", color: "#DC2626" }}>
                            ({product.promoDiscount}% OFF - RM {Math.round(product.price * (1 - product.promoDiscount / 100))})
                          </span>
                        )}
                      </p>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button onClick={() => openEditForm(product)} style={{
                          flex: 1, padding: "6px", fontSize: "11px",
                          border: "1px solid #E8E2D9", borderRadius: "4px",
                          background: "white", cursor: "pointer"
                        }}>Edit</button>
                        <button onClick={() => handleDelete(product._id, product.name)} style={{
                          flex: 1, padding: "6px", fontSize: "11px",
                          border: "1px solid #F7C1C1", borderRadius: "4px",
                          background: "white", cursor: "pointer", color: "#A32D2D"
                        }}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CATEGORIES */}
        {page === "categories" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "400" }}>Categories</h2>
              <button onClick={() => setShowAddCategory(true)} style={{
                background: "#1A1714", color: "white", border: "none",
                padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontSize: "13px"
              }}>+ Add Category</button>
            </div>

            {editingCategory && (
              <div style={{
                background: "white", border: "1px solid #E8E2D9",
                borderRadius: "8px", padding: "20px", marginBottom: "24px"
              }}>
                <h3 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "16px" }}>
                  Edit: {editingCategory.name}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Current Image</label>
                    {editingCategory.img ? (
                      <img src={editingCategory.img} alt={editingCategory.name} style={{
                        width: "80px", height: "80px", objectFit: "cover",
                        borderRadius: "6px", border: "1px solid #E8E2D9"
                      }} />
                    ) : (
                      <p style={{ fontSize: "12px", color: "#888" }}>No image yet</p>
                    )}
                  </div>
                  <div>
                    <label style={labelStyle}>New Image</label>
                    <input type="file" accept="image/*"
                      onChange={e => {
                        const file = e.target.files[0]
                        if (file) {
                          setEditCategoryImage(file)
                          setEditCategoryPreview(URL.createObjectURL(file))
                        }
                      }}
                      style={{ ...inputStyle, padding: "8px" }} />
                    {editCategoryPreview && (
                      <img src={editCategoryPreview} alt="preview" style={{
                        width: "80px", height: "80px", objectFit: "cover",
                        borderRadius: "6px", border: "1px solid #E8E2D9", marginTop: "8px"
                      }} />
                    )}
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Description</label>
                    <textarea value={editCategoryDesc}
                      onChange={e => setEditCategoryDesc(e.target.value)}
                      placeholder="e.g. Sacred artworks of Lord Murugan..."
                      rows={2} style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                  <button onClick={handleUpdateCategory} style={{
                    background: "#1A1714", color: "white", border: "none",
                    padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontSize: "13px"
                  }}>Update</button>
                  <button onClick={() => {
                    setEditingCategory(null)
                    setEditCategoryImage(null)
                    setEditCategoryPreview(null)
                    setEditCategoryDesc("")
                  }} style={{
                    background: "white", color: "#1A1714", border: "1px solid #E8E2D9",
                    padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontSize: "13px"
                  }}>Cancel</button>
                </div>
              </div>
            )}

            {showAddCategory && (
              <div style={{
                background: "white", border: "1px solid #E8E2D9",
                borderRadius: "8px", padding: "20px", marginBottom: "24px"
              }}>
                <h3 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "16px" }}>
                  Add New Category
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Category Name</label>
                    <input value={newCategory} onChange={e => setNewCategory(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleAddCategory()}
                      placeholder="e.g. Lord Ganesha" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Category Image</label>
                    <input type="file" accept="image/*"
                      onChange={e => {
                        const file = e.target.files[0]
                        if (file) {
                          setNewCategoryImage(file)
                          setNewCategoryPreview(URL.createObjectURL(file))
                        }
                      }}
                      style={{ ...inputStyle, padding: "8px" }} />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Description</label>
                    <textarea value={newCategoryDesc}
                      onChange={e => setNewCategoryDesc(e.target.value)}
                      placeholder="e.g. Sacred devotional artworks of Lord Ganesha..."
                      rows={2} style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  {newCategoryPreview && (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <img src={newCategoryPreview} alt="preview" style={{
                        width: "80px", height: "80px", objectFit: "cover",
                        borderRadius: "6px", border: "1px solid #E8E2D9"
                      }} />
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                  <button onClick={handleAddCategory} style={{
                    background: "#1A1714", color: "white", border: "none",
                    padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontSize: "13px"
                  }}>Save Category</button>
                  <button onClick={() => {
                    setShowAddCategory(false)
                    setNewCategory("")
                    setNewCategoryDesc("")
                    setNewCategoryImage(null)
                    setNewCategoryPreview(null)
                  }} style={{
                    background: "white", color: "#1A1714", border: "1px solid #E8E2D9",
                    padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontSize: "13px"
                  }}>Cancel</button>
                </div>
              </div>
            )}

            <div style={{ background: "white", border: "1px solid #E8E2D9", borderRadius: "8px", overflow: "hidden" }}>
              {categories.length === 0 ? (
                <p style={{ padding: "20px", color: "#8B7355" }}>No categories yet!</p>
              ) : categories.map((cat, i) => {
                const name = typeof cat === "string" ? cat : cat.name
                const img = typeof cat === "object" ? cat.image : null
                const desc = typeof cat === "object" ? cat.description : ""
                return (
                  <div key={name} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 20px",
                    borderBottom: i < categories.length - 1 ? "1px solid #F0EDE8" : "none",
                    background: i % 2 === 0 ? "white" : "#FAF8F4"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {img ? (
                        <img src={img} alt={name} style={{
                          width: "40px", height: "40px", objectFit: "cover",
                          borderRadius: "6px", border: "1px solid #E8E2D9"
                        }} />
                      ) : (
                        <div style={{
                          width: "40px", height: "40px", borderRadius: "6px",
                          background: "#EDE8E0", display: "flex",
                          alignItems: "center", justifyContent: "center",
                          fontSize: "12px", color: "#8B7355"
                        }}>IMG</div>
                      )}
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: "500" }}>{name}</p>
                        {desc && <p style={{ fontSize: "11px", color: "#8B7355", marginTop: "2px" }}>{desc}</p>}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => {
                        setEditingCategory({ name, img })
                        setEditCategoryImage(null)
                        setEditCategoryPreview(null)
                        setEditCategoryDesc(desc || "")
                      }} style={{
                        background: "none", border: "1px solid #E8E2D9",
                        color: "#1A1714", padding: "4px 12px",
                        borderRadius: "4px", cursor: "pointer", fontSize: "11px"
                      }}>Edit</button>
                      <button onClick={() => handleDeleteCategory(name)} style={{
                        background: "none", border: "1px solid #F7C1C1",
                        color: "#A32D2D", padding: "4px 12px",
                        borderRadius: "4px", cursor: "pointer", fontSize: "11px"
                      }}>Remove</button>
                    </div>
                  </div>
                )
              })}
            </div>
            <p style={{ fontSize: "11px", color: "#8B7355", marginTop: "12px" }}>
              Removing a category does not delete products already using it.
            </p>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      {showChangePw && (
        <>
          <div onClick={() => setShowChangePw(false)} style={{
            position: "fixed", top: 0, left: 0,
            width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.5)", zIndex: 300
          }} />
          <div style={{
            position: "fixed", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white", borderRadius: "12px",
            padding: "32px", width: "90%", maxWidth: "400px",
            zIndex: 301, boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>
              Change Password
            </h3>
            {changePwError && (
              <div style={{
                background: "#FCEBEB", color: "#A32D2D",
                padding: "10px 14px", borderRadius: "6px",
                fontSize: "13px", marginBottom: "16px"
              }}>{changePwError}</div>
            )}
            {changePwMsg && (
              <div style={{
                background: "#EAF3DE", color: "#3B6D11",
                padding: "10px 14px", borderRadius: "6px",
                fontSize: "13px", marginBottom: "16px"
              }}>{changePwMsg}</div>
            )}
            <label style={labelStyle}>Current Password</label>
            <input type="password" value={changePwForm.current}
              onChange={e => setChangePwForm({ ...changePwForm, current: e.target.value })}
              placeholder="Enter current password"
              style={{ ...inputStyle, marginBottom: "12px" }} />
            <label style={labelStyle}>New Password</label>
            <input type="password" value={changePwForm.newPw}
              onChange={e => setChangePwForm({ ...changePwForm, newPw: e.target.value })}
              placeholder="Enter new password (min 6 chars)"
              style={{ ...inputStyle, marginBottom: "12px" }} />
            <label style={labelStyle}>Confirm New Password</label>
            <input type="password" value={changePwForm.confirm}
              onChange={e => setChangePwForm({ ...changePwForm, confirm: e.target.value })}
              placeholder="Confirm new password"
              style={{ ...inputStyle, marginBottom: "20px" }} />
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={handleChangePassword} style={{
                flex: 1, padding: "12px",
                background: "#1A1714", color: "white",
                border: "none", borderRadius: "6px",
                cursor: "pointer", fontSize: "13px"
              }}>Change Password</button>
              <button onClick={() => {
                setShowChangePw(false)
                setChangePwError("")
                setChangePwMsg("")
                setChangePwForm({ current: "", newPw: "", confirm: "" })
              }} style={{
                flex: 1, padding: "12px",
                background: "white", color: "#1A1714",
                border: "1px solid #E8E2D9", borderRadius: "6px",
                cursor: "pointer", fontSize: "13px"
              }}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const thStyle = {
  padding: "10px 14px", textAlign: "left", fontSize: "11px",
  letterSpacing: "0.1em", color: "#8B7355", fontWeight: "500",
  borderBottom: "1px solid #E8E2D9", whiteSpace: "nowrap"
}
const tdStyle = { padding: "12px 14px", verticalAlign: "top" }
const labelStyle = {
  display: "block", fontSize: "11px", letterSpacing: "0.08em",
  textTransform: "uppercase", color: "#3D3830", marginBottom: "6px"
}
const inputStyle = {
  width: "100%", padding: "10px 12px", border: "1px solid #E8E2D9",
  borderRadius: "4px", fontSize: "13px", fontFamily: "inherit",
  outline: "none", boxSizing: "border-box"
}