import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    state: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePay = async () => {
    const empty = Object.values(form).some(v => v.trim() === '')
    if (empty) {
      setError('Please fill in all fields!')
      return
    }
    if (cartItems.length === 0) {
      setError('Your cart is empty!')
      return
    }

    setLoading(true)
    setError('')

    const orderData = {
      customer: form,
      items: cartItems.map(i => ({
        name: i.product.name,
        color: i.variant.color,
        size: i.variant.size,
        qty: i.qty,
        price: i.product.price
      })),
      subtotal: total,
      shipping: 8,
      total: total + 8
    }

    const res = await fetch(' https://setback-product-cubical.ngrok-free.dev/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })

    const data = await res.json()
    console.log('Order response:', data)

    if (data.success) {
      clearCart()
      window.location.href = 'https://toyyibpay.com/demoks'
    } else {
      setError('Order failed: ' + data.error)
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />

      <div style={{ padding: '12px 24px', fontSize: '12px', color: '#8B7355',
        borderBottom: '1px solid #E8E2D9' }}>
        <a href="/" style={{ color: '#8B7355' }}>Home</a> &nbsp;/&nbsp;
        <a href="/cart" style={{ color: '#8B7355' }}>Cart</a> &nbsp;/&nbsp;
        Checkout
      </div>

      <div
        className="checkout-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '40px',
          padding: '40px 24px',
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >
        {/* Left - Form */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '400', marginBottom: '24px' }}>
            Delivery Details
          </h2>

          {error && (
            <div style={{
              background: '#FCEBEB', color: '#A32D2D', padding: '12px 16px',
              borderRadius: '4px', marginBottom: '16px', fontSize: '13px'
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="John Doe" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input name="email" value={form.email} onChange={handleChange}
                placeholder="john@email.com" style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Phone Number</label>
            <input name="phone" value={form.phone} onChange={handleChange}
              placeholder="+60 12-345 6789" style={inputStyle} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Address</label>
            <input name="address" value={form.address} onChange={handleChange}
              placeholder="No. 12, Jalan Seri Petaling" style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>City</label>
              <input name="city" value={form.city} onChange={handleChange}
                placeholder="Kuala Lumpur" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Postcode</label>
              <input name="postcode" value={form.postcode} onChange={handleChange}
                placeholder="57000" style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>State</label>
            <input name="state" value={form.state} onChange={handleChange}
              placeholder="Wilayah Persekutuan" style={inputStyle} />
          </div>

          <div style={{
            padding: '14px 16px', background: '#FAF8F4',
            border: '1px solid #E8E2D9', borderRadius: '6px',
            fontSize: '13px', color: '#3D3830'
          }}>
            💳 You will be redirected to <strong>ToyyibPay</strong> to complete
            payment via FPX / Online Banking
          </div>
        </div>

        {/* Right - Order Summary */}
        <div>
          <div style={{
            background: 'white', border: '1px solid #E8E2D9',
            borderRadius: '8px', padding: '20px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '16px' }}>
              Order Summary
            </h3>

            {cartItems.length === 0 ? (
              <p style={{ color: '#8B7355', fontSize: '13px' }}>
                No items in cart.{' '}
                <a href="/shop" style={{ color: '#1A1714' }}>Go shop!</a>
              </p>
            ) : (
              cartItems.map(item => (
                <div key={item.key} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 0', borderBottom: '1px solid #E8E2D9', fontSize: '13px'
                }}>
                  <div>
                    <p style={{ fontWeight: '500', marginBottom: '2px' }}>{item.product.name}</p>
                    <p style={{ color: '#8B7355', fontSize: '11px' }}>
                      {item.variant.color} · {item.variant.size} × {item.qty}
                    </p>
                  </div>
                  <span style={{ fontWeight: '500' }}>
                    RM {item.product.price * item.qty}
                  </span>
                </div>
              ))
            )}

            <div style={{ marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                fontSize: '13px', color: '#3D3830', padding: '6px 0',
                borderBottom: '1px solid #E8E2D9' }}>
                <span>Subtotal</span><span>RM {total}.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                fontSize: '13px', color: '#3D3830', padding: '6px 0',
                borderBottom: '1px solid #E8E2D9' }}>
                <span>Shipping</span><span>RM 8.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                fontSize: '16px', fontWeight: '500', padding: '12px 0 0' }}>
                <span>Total</span><span>RM {total + 8}.00</span>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={loading}
              style={{
                width: '100%', marginTop: '16px', padding: '14px',
                background: loading ? '#8B7355' : '#1A1714',
                color: 'white', border: 'none', borderRadius: '4px',
                fontSize: '13px', letterSpacing: '0.08em',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Processing...' : `Pay with ToyyibPay — RM ${total + 8}.00`}
            </button>

            <p style={{ textAlign: 'center', fontSize: '10px', color: '#8B7355',
              marginTop: '8px', letterSpacing: '0.06em' }}>
              Secure payment via ToyyibPay · FPX
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block', fontSize: '11px', letterSpacing: '0.08em',
  textTransform: 'uppercase', color: '#3D3830', marginBottom: '6px'
}

const inputStyle = {
  width: '100%', padding: '10px 12px', border: '1px solid #E8E2D9',
  borderRadius: '4px', fontSize: '13px', fontFamily: 'inherit',
  outline: 'none', boxSizing: 'border-box'
}

