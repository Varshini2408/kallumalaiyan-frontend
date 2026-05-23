import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cartItems, removeFromCart, total } = useCart()

  return (
    <div>
      <Navbar />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '300', marginBottom: '24px' }}>
          Your Cart
        </h1>

        {/* Empty Cart */}
        {cartItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: '18px', color: '#8B7355', marginBottom: '24px' }}>
              Your cart is empty!
            </p>
            <Link to="/shop" style={{
              background: '#1A1714',
              color: 'white',
              padding: '12px 32px',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              Go Shop
            </Link>
          </div>
        )}

        {/* Cart Items */}
        {cartItems.map(item => (
          <div key={item.key} style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr auto',
            gap: '16px',
            padding: '20px 0',
            borderBottom: '1px solid #E8E2D9',
            alignItems: 'center'
          }}>
            {/* Image */}
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #EDE8E0, #D4C8B8)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              {item.product.emoji}
            </div>

            {/* Info */}
            <div>
              <p style={{ fontWeight: '500', fontSize: '16px', marginBottom: '4px' }}>
                {item.product.name}
              </p>
              <p style={{ fontSize: '12px', color: '#8B7355', marginBottom: '4px' }}>
                {item.variant.color} · {item.variant.size} · Qty: {item.qty}
              </p>
              <p style={{ fontSize: '14px', fontWeight: '500' }}>
                RM {item.product.price * item.qty}.00
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.key)}
              style={{
                background: 'none',
                border: '1px solid #E8E2D9',
                borderRadius: '4px',
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: '12px',
                color: '#8B7355'
              }}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Summary */}
        {cartItems.length > 0 && (
          <div style={{
            marginTop: '24px',
            padding: '24px',
            background: 'white',
            border: '1px solid #E8E2D9',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E8E2D9', fontSize: '14px', color: '#3D3830' }}>
              <span>Subtotal</span>
              <span>RM {total}.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E8E2D9', fontSize: '14px', color: '#3D3830' }}>
              <span>Shipping</span>
              <span>RM 8.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', fontSize: '18px', fontWeight: '500' }}>
              <span>Total</span>
              <span>RM {total + 8}.00</span>
            </div>

            <Link to="/checkout" style={{
              display: 'block',
              textAlign: 'center',
              marginTop: '20px',
              background: '#1A1714',
              color: 'white',
              padding: '14px',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              letterSpacing: '0.08em'
            }}>
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}