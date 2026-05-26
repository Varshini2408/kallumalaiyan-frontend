import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API = 'https://kallumalaiyan-backend.onrender.com'

const emptyForm = {
  name: '',
  category: '',
  description: '',
  imageFiles: [],
  imageBWFile: null,
  imageBWPreview: null,
  imageColorFile: null,
  imageColorPreview: null,
  isHotSelling: false,
  isNewArrival: false,
  isRecommended: false,
}

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [page, setPage] = useState('orders')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [previews, setPreviews] = useState([])
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [newCategoryImage, setNewCategoryImage] = useState(null)
  const [newCategoryPreview, setNewCategoryPreview] = useState(null)

  useEffect(() => {
    const auth = sessionStorage.getItem('ksa-admin-auth')
    if (auth === 'true') setIsLoggedIn(true)
    fetchOrders()
    fetchProducts()
    fetchCategories()
  }, [])

  const handleLogin = () => {
    if (password === 'kallumalaiyan2024') {
      sessionStorage.setItem('ksa-admin-auth', 'true')
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('Wrong password! Try again.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('ksa-admin-auth')
    setIsLoggedIn(false)
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch(API + '/api/orders')
      const data = await res.json()
      setOrders(data)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch(API + '/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (err) { console.error(err) }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(API + '/api/categories')
      const data = await res.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err) }
  }

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setForm({ ...form, imageFiles: files })
    setPreviews(files.map(f => URL.createObjectURL(f)))
  }

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return
    try {
      const formData = new FormData()
      formData.append('name', newCategory.trim())
      if (newCategoryImage) formData.append('image', newCategoryImage)
      const res = await fetch(API + '/api/categories', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.categories) {
        setCategories(data.categories)
        setMessage('Category added: ' + newCategory.trim())
        setNewCategory('')
        setNewCategoryImage(null)
        setNewCategoryPreview(null)
        setShowAddCategory(false)
      } else {
        setMessage('Error: ' + data.error)
      }
    } catch (err) { setMessage('Error: ' + err.message) }
  }

  const handleDeleteCategory = async (cat) => {
    try {
      const res = await fetch(API + '/api/categories/' + encodeURIComponent(cat), { method: 'DELETE' })
      const data = await res.json()
      if (data.categories) {
        setCategories(data.categories)
        setMessage('Category removed: ' + cat)
      }
    } catch (err) { setMessage('Error removing category') }
  }

  const openAddForm = () => {
    setForm(emptyForm)
    setEditingProduct(null)
    setPreviews([])
    setShowForm(true)
  }

  const openEditForm = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      description: product.description || '',
      imageFiles: [],
      imageBWFile: null,
      imageBWPreview: null,
      imageColorFile: null,
      imageColorPreview: null,
      isHotSelling: product.isHotSelling || false,
      isNewArrival: product.isNewArrival || false,
      isRecommended: product.isRecommended || false,
    })
    setEditingProduct(product)
    setPreviews(
      product.images && product.images.length > 0
        ? product.images
        : product.image ? [product.image] : []
    )
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.category) {
      setMessage('Please fill in name and category!')
      return
    }
    setSaving(true)
    setMessage('')
    try {
      const url = editingProduct
        ? API + '/api/products/' + editingProduct._id
        : API + '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('category', form.category)
      formData.append('description', form.description)
      formData.append('isHotSelling', String(form.isHotSelling))
      formData.append('isNewArrival', String(form.isNewArrival))
      formData.append('isRecommended', String(form.isRecommended))
      if (form.imageBWFile) formData.append('imageBW', form.imageBWFile)
      if (form.imageColorFile) formData.append('imageColor', form.imageColorFile)
      if (form.imageFiles && form.imageFiles.length > 0) {
        form.imageFiles.forEach(file => formData.append('images', file))
      }
      const res = await fetch(url, { method, body: formData })
      const data = await res.json()
      if (data._id) {
        setMessage(editingProduct ? 'Product updated!' : 'Product added!')
        setShowForm(false)
        setPreviews([])
        fetchProducts()
      } else {
        setMessage('Error: ' + data.error)
      }
    } catch (err) { setMessage('Error: ' + err.message) }
    setSaving(false)
  }

  const handleDelete = async (productId, productName) => {
    const confirmed = window.confirm('Delete ' + productName + '?')
    if (!confirmed) return
    try {
      await fetch(API + '/api/products/' + productId, { method: 'DELETE' })
      setMessage('Product deleted!')
      fetchProducts()
    } catch (err) { setMessage('Error deleting product') }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(API + '/api/orders/' + orderId + '/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      const data = await res.json()
      if (data._id) {
        setOrders(prev => prev.map(o => o._id === data._id ? { ...o, status: data.status } : o))
        setMessage('Status updated to: ' + newStatus)
      }
    } catch (err) { setMessage('Error updating status') }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'delivered': return { background: '#EAF3DE', color: '#3B6D11' }
      case 'posted':    return { background: '#E6F1FB', color: '#0C447C' }
      case 'accepted':  return { background: '#FAEEDA', color: '#854F0B' }
      case 'paid':      return { background: '#EAF3DE', color: '#3B6D11' }
      default:          return { background: '#F5F3EF', color: '#3D3830' }
    }
  }

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#F5F3EF'
      }}>
        <div style={{
          background: 'white', padding: '40px',
          borderRadius: '12px', border: '1px solid #E8E2D9',
          width: '100%', maxWidth: '380px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <p style={{ fontSize: '24px', fontWeight: '600', color: '#1A1714', marginBottom: '4px' }}>
              KSA Admin
            </p>
            <p style={{ fontSize: '13px', color: '#8B7355' }}>
              Kallumalaiyan SketchArt Dashboard
            </p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Enter your password"
              style={inputStyle}
            />
          </div>
          {loginError && (
            <div style={{
              background: '#FCEBEB', color: '#A32D2D',
              padding: '10px 14px', borderRadius: '6px',
              fontSize: '13px', marginBottom: '16px'
            }}>
              {loginError}
            </div>
          )}
          <button onClick={handleLogin} style={{
            width: '100%', padding: '12px',
            background: '#1A1714', color: 'white',
            border: 'none', borderRadius: '6px',
            fontSize: '14px', cursor: 'pointer'
          }}>
            Login
          </button>
          <p style={{ textAlign: 'center', fontSize: '11px', color: '#8B7355', marginTop: '20px' }}>
            Protected area - Kallumalaiyan SketchArt
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* Sidebar */}
      <div style={{
        width: '220px', background: '#1A1714',
        padding: '24px 16px', display: 'flex',
        flexDirection: 'column', gap: '4px',
        flexShrink: 0
      }}>
        <p style={{ color: '#C4A882', fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
          KSA Admin
        </p>
        <p style={{ color: '#8B7355', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '24px' }}>
          DASHBOARD
        </p>
        {[
          { id: 'orders', label: 'Orders' },
          { id: 'products', label: 'Products' },
          { id: 'categories', label: 'Categories' },
        ].map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{
            padding: '10px 14px',
            background: page === item.id ? 'rgba(255,255,255,0.1)' : 'transparent',
            color: '#FAF8F4', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '13px', textAlign: 'left'
          }}>
            {item.label}
          </button>
        ))}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link to="/" style={{ color: '#8B7355', fontSize: '12px', textDecoration: 'none' }}>
            Back to Site
          </Link>
          <button onClick={handleLogout} style={{
            padding: '8px 14px', background: 'transparent',
            color: '#8B7355', border: '1px solid #3D3830',
            borderRadius: '6px', cursor: 'pointer',
            fontSize: '12px', textAlign: 'left'
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px', background: '#F5F3EF', overflowY: 'auto' }}>

        {/* Message */}
        {message && (
          <div style={{
            padding: '12px 16px', borderRadius: '6px', marginBottom: '16px',
            background: message.includes('Error') ? '#FCEBEB' : '#EAF3DE',
            color: message.includes('Error') ? '#A32D2D' : '#3B6D11',
            fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            {message}
            <button onClick={() => setMessage('')} style={{
              background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px'
            }}>x</button>
          </div>
        )}

        {/* ORDERS PAGE */}
        {page === 'orders' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '400', marginBottom: '24px' }}>Orders</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: 'TOTAL ORDERS', value: orders.length },
                { label: 'REVENUE', value: 'RM ' + orders.reduce((s, o) => s + (o.total || 0), 0) },
                { label: 'PENDING', value: orders.filter(o => o.status === 'pending').length },
                { label: 'DELIVERED', value: orders.filter(o => o.status === 'delivered').length },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: 'white', border: '1px solid #E8E2D9',
                  borderRadius: '8px', padding: '16px'
                }}>
                  <p style={{ fontSize: '11px', color: '#8B7355', letterSpacing: '0.1em', marginBottom: '6px' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: '26px', fontWeight: '500' }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {loading ? (
              <p style={{ color: '#8B7355' }}>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p style={{ color: '#8B7355' }}>No orders yet!</p>
            ) : (
              <div style={{ background: 'white', border: '1px solid #E8E2D9', borderRadius: '8px', overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#FAF8F4' }}>
                      {['Customer', 'Phone', 'Address', 'Items', 'Total', 'Status', 'Date'].map(h => (
                        <th key={h} style={thStyle}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} style={{ borderBottom: '1px solid #F0EDE8' }}>
                        <td style={tdStyle}>
                          <p style={{ fontWeight: '500' }}>{order.customer.name}</p>
                          <p style={{ fontSize: '11px', color: '#8B7355' }}>{order.customer.email}</p>
                        </td>
                        <td style={tdStyle}>{order.customer.phone}</td>
                        <td style={tdStyle}>
                          <p style={{ fontSize: '11px' }}>{order.customer.address}</p>
                          <p style={{ fontSize: '11px', color: '#8B7355' }}>
                            {order.customer.city}, {order.customer.postcode}
                          </p>
                          <p style={{ fontSize: '11px', color: '#8B7355' }}>{order.customer.state}</p>
                        </td>
                        <td style={tdStyle}>
                          {order.items.map((item, i) => (
                            <p key={i} style={{ fontSize: '11px', color: '#3D3830', marginBottom: '2px' }}>
                              {item.name} · {item.color} · {item.size} x{item.qty}
                            </p>
                          ))}
                        </td>
                        <td style={tdStyle}>
                          <p style={{ fontWeight: '500' }}>RM {order.total}</p>
                        </td>
                        <td style={tdStyle}>
                          <select
                            value={order.status}
                            onChange={e => updateOrderStatus(order._id, e.target.value)}
                            style={{
                              padding: '6px 10px', fontSize: '11px',
                              borderRadius: '6px', border: '1px solid #E8E2D9',
                              cursor: 'pointer', fontFamily: 'inherit',
                              fontWeight: '500', outline: 'none',
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
                          <p style={{ fontSize: '11px' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                          <p style={{ fontSize: '11px', color: '#8B7355' }}>{new Date(order.createdAt).toLocaleTimeString()}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* PRODUCTS PAGE */}
        {page === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '400' }}>Products</h2>
              <button onClick={openAddForm} style={{
                background: '#1A1714', color: 'white', border: 'none',
                padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
              }}>
                + Add Product
              </button>
            </div>

            {showForm && (
              <div style={{
                background: 'white', border: '1px solid #E8E2D9',
                borderRadius: '8px', padding: '24px', marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '20px' }}>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

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
                        const name = typeof cat === 'string' ? cat : cat.name
                        return <option key={name} value={name}>{name}</option>
                      })}
                    </select>
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Description / Order comes with</label>
                    <textarea name="description" value={form.description} onChange={handleFormChange}
                      placeholder="Describe this product and what comes with the order..."
                      rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>

                  {/* Black & White Image */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Black and White Image</label>
                    <input
                      type="file" accept="image/*"
                      onChange={e => {
                        const file = e.target.files[0]
                        if (file) setForm({ ...form, imageBWFile: file, imageBWPreview: URL.createObjectURL(file) })
                      }}
                      style={{ ...inputStyle, padding: '8px' }}
                    />
                    {(form.imageBWPreview || editingProduct?.imageBW) && (
                      <div style={{ marginTop: '8px' }}>
                        <p style={{ fontSize: '11px', color: '#8B7355', marginBottom: '4px' }}>
                          Black and White Preview:
                        </p>
                        <img
                          src={form.imageBWPreview || editingProduct?.imageBW}
                          alt="BW"
                          style={{
                            width: '80px', height: '100px', objectFit: 'contain',
                            borderRadius: '6px', border: '1px solid #E8E2D9', background: '#F5F5F5'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Color Image */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Color Image</label>
                    <input
                      type="file" accept="image/*"
                      onChange={e => {
                        const file = e.target.files[0]
                        if (file) setForm({ ...form, imageColorFile: file, imageColorPreview: URL.createObjectURL(file) })
                      }}
                      style={{ ...inputStyle, padding: '8px' }}
                    />
                    {(form.imageColorPreview || editingProduct?.imageColor) && (
                      <div style={{ marginTop: '8px' }}>
                        <p style={{ fontSize: '11px', color: '#8B7355', marginBottom: '4px' }}>
                          Color Preview:
                        </p>
                        <img
                          src={form.imageColorPreview || editingProduct?.imageColor}
                          alt="Color"
                          style={{
                            width: '80px', height: '100px', objectFit: 'contain',
                            borderRadius: '6px', border: '1px solid #E8E2D9', background: '#F5F5F5'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Product Tags */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Product Tags</label>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      {[
                        { key: 'isHotSelling', label: 'Hot Selling' },
                        { key: 'isNewArrival', label: 'New Arrival' },
                        { key: 'isRecommended', label: 'Recommended' },
                      ].map(tag => (
                        <label key={tag.key} style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          cursor: 'pointer', fontSize: '13px', color: '#3D3830'
                        }}>
                          <input
                            type="checkbox"
                            checked={form[tag.key] || false}
                            onChange={e => setForm({ ...form, [tag.key]: e.target.checked })}
                            style={{ width: '16px', height: '16px', accentColor: '#1A1714' }}
                          />
                          {tag.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <button onClick={handleSave} disabled={saving} style={{
                    background: '#1A1714', color: 'white', border: 'none',
                    padding: '10px 24px', borderRadius: '6px',
                    cursor: saving ? 'not-allowed' : 'pointer', fontSize: '13px'
                  }}>
                    {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button onClick={() => { setShowForm(false); setPreviews([]) }} style={{
                    background: 'white', color: '#1A1714', border: '1px solid #E8E2D9',
                    padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
                  }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#8B7355' }}>
                <p style={{ fontSize: '18px', marginBottom: '16px' }}>No products yet!</p>
                <button onClick={openAddForm} style={{
                  background: '#1A1714', color: 'white', border: 'none',
                  padding: '12px 24px', borderRadius: '6px', cursor: 'pointer'
                }}>Add your first product</button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {products.map(product => (
                  <div key={product._id} style={{
                    background: 'white', border: '1px solid #E8E2D9',
                    borderRadius: '8px', overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '160px', background: '#F5F5F5',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', overflow: 'hidden',
                      position: 'relative'
                    }}>
                      {product.imageBW || product.images?.[0] || product.image ? (
                        <img
                          src={product.imageBW || product.images?.[0] || product.image}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      ) : (
                        <span style={{ fontSize: '36px' }}>🎨</span>
                      )}
                      <div style={{
                        position: 'absolute', top: '6px', right: '6px',
                        display: 'flex', gap: '4px'
                      }}>
                        {product.isHotSelling && (
                          <span style={{
                            background: '#FEE2E2', color: '#DC2626',
                            fontSize: '9px', padding: '2px 6px', borderRadius: '10px'
                          }}>HOT</span>
                        )}
                        {product.isNewArrival && (
                          <span style={{
                            background: '#DCFCE7', color: '#16A34A',
                            fontSize: '9px', padding: '2px 6px', borderRadius: '10px'
                          }}>NEW</span>
                        )}
                      </div>
                    </div>
                    <div style={{ padding: '12px' }}>
                      <p style={{ fontWeight: '500', fontSize: '14px', marginBottom: '2px' }}>
                        {product.name}
                      </p>
                      <p style={{ fontSize: '12px', color: '#8B7355', marginBottom: '4px' }}>
                        {product.category}
                      </p>
                      <p style={{ fontSize: '12px', color: '#8B7355', marginBottom: '8px' }}>
                        RM {product.price}
                        {product.imageBW && product.imageColor && (
                          <span style={{ marginLeft: '6px', fontSize: '10px', color: '#3B6D11' }}>
                            BW + Color
                          </span>
                        )}
                      </p>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => openEditForm(product)} style={{
                          flex: 1, padding: '6px', fontSize: '11px',
                          border: '1px solid #E8E2D9', borderRadius: '4px',
                          background: 'white', cursor: 'pointer'
                        }}>Edit</button>
                        <button onClick={() => handleDelete(product._id, product.name)} style={{
                          flex: 1, padding: '6px', fontSize: '11px',
                          border: '1px solid #F7C1C1', borderRadius: '4px',
                          background: 'white', cursor: 'pointer', color: '#A32D2D'
                        }}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CATEGORIES PAGE */}
        {page === 'categories' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '400' }}>Categories</h2>
              <button onClick={() => setShowAddCategory(true)} style={{
                background: '#1A1714', color: 'white', border: 'none',
                padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
              }}>
                + Add Category
              </button>
            </div>

            {showAddCategory && (
              <div style={{
                background: 'white', border: '1px solid #E8E2D9',
                borderRadius: '8px', padding: '20px', marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px' }}>
                  Add New Category
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Category Name</label>
                    <input
                      value={newCategory}
                      onChange={e => setNewCategory(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
                      placeholder="e.g. Lord Ganesha"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Category Image</label>
                    <input
                      type="file" accept="image/*"
                      onChange={e => {
                        const file = e.target.files[0]
                        if (file) {
                          setNewCategoryImage(file)
                          setNewCategoryPreview(URL.createObjectURL(file))
                        }
                      }}
                      style={{ ...inputStyle, padding: '8px' }}
                    />
                  </div>
                  {newCategoryPreview && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <img src={newCategoryPreview} alt="preview" style={{
                        width: '80px', height: '80px', objectFit: 'cover',
                        borderRadius: '6px', border: '1px solid #E8E2D9'
                      }} />
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button onClick={handleAddCategory} style={{
                    background: '#1A1714', color: 'white', border: 'none',
                    padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
                  }}>Save Category</button>
                  <button onClick={() => {
                    setShowAddCategory(false)
                    setNewCategory('')
                    setNewCategoryImage(null)
                    setNewCategoryPreview(null)
                  }} style={{
                    background: 'white', color: '#1A1714', border: '1px solid #E8E2D9',
                    padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
                  }}>Cancel</button>
                </div>
              </div>
            )}

            <div style={{ background: 'white', border: '1px solid #E8E2D9', borderRadius: '8px', overflow: 'hidden' }}>
              {categories.map((cat, i) => {
                const name = typeof cat === 'string' ? cat : cat.name
                const img = typeof cat === 'object' ? cat.image : null
                return (
                  <div key={name} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 20px',
                    borderBottom: i < categories.length - 1 ? '1px solid #F0EDE8' : 'none',
                    background: i % 2 === 0 ? 'white' : '#FAF8F4'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {img ? (
                        <img src={img} alt={name} style={{
                          width: '40px', height: '40px', objectFit: 'cover',
                          borderRadius: '6px', border: '1px solid #E8E2D9'
                        }} />
                      ) : (
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '6px',
                          background: '#EDE8E0', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', fontSize: '18px'
                        }}>🕉️</div>
                      )}
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>{name}</span>
                    </div>
                    <button onClick={() => handleDeleteCategory(name)} style={{
                      background: 'none', border: '1px solid #F7C1C1',
                      color: '#A32D2D', padding: '4px 12px',
                      borderRadius: '4px', cursor: 'pointer', fontSize: '11px'
                    }}>Remove</button>
                  </div>
                )
              })}
            </div>
            <p style={{ fontSize: '11px', color: '#8B7355', marginTop: '12px' }}>
              Removing a category does not delete products already using it.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

const thStyle = {
  padding: '10px 14px', textAlign: 'left', fontSize: '11px',
  letterSpacing: '0.1em', color: '#8B7355', fontWeight: '500',
  borderBottom: '1px solid #E8E2D9', whiteSpace: 'nowrap'
}
const tdStyle = { padding: '12px 14px', verticalAlign: 'top' }
const labelStyle = {
  display: 'block', fontSize: '11px', letterSpacing: '0.08em',
  textTransform: 'uppercase', color: '#3D3830', marginBottom: '6px'
}
const inputStyle = {
  width: '100%', padding: '10px 12px', border: '1px solid #E8E2D9',
  borderRadius: '4px', fontSize: '13px', fontFamily: 'inherit',
  outline: 'none', boxSizing: 'border-box'
}