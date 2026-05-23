import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function OrderConfirmation() {
  return (
    <div>
      <Navbar />

      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '60px 32px',
        textAlign: 'center'
      }}>

        {/* Green tick circle */}
        <div style={{
          width: '72px',
          height: '72px',
          background: '#EAF3DE',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '32px'
        }}>
          ✓
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: '400',
          marginBottom: '12px',
          color: '#1A1714'
        }}>
          Order Confirmed!
        </h1>

        <p style={{
          color: '#3D3830',
          lineHeight: '1.8',
          marginBottom: '32px',
          fontSize: '14px'
        }}>
          Thank you for your order! You will receive a confirmation 
          on Telegram shortly. Your sketch will be carefully crafted 
          and shipped within 7 working days.
        </p>

        {/* Order Details Box */}
        <div style={{
          background: 'white',
          border: '1px solid #E8E2D9',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'left',
          marginBottom: '32px'
        }}>
          <div style={rowStyle}>
            <span style={labelStyle}>Status</span>
            <span style={{
              background: '#EAF3DE',
              color: '#3B6D11',
              padding: '2px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Paid ✓
            </span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Telegram</span>
            <span style={{ fontSize: '13px' }}>Notification sent ✓</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Delivery</span>
            <span style={{ fontSize: '13px' }}>Within 7 working days</span>
          </div>
          <div style={{ ...rowStyle, borderBottom: 'none' }}>
            <span style={labelStyle}>Questions?</span>
            <span style={{ fontSize: '13px', color: '#8B7355' }}>
              Telegram us anytime
            </span>
          </div>
        </div>

        {/* Buttons */}
        <Link to="/shop" style={{
          display: 'inline-block',
          background: '#1A1714',
          color: 'white',
          padding: '12px 32px',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          letterSpacing: '0.08em',
          marginRight: '12px'
        }}>
          Shop More
        </Link>

        <Link to="/" style={{
          display: 'inline-block',
          background: 'transparent',
          color: '#1A1714',
          padding: '12px 32px',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          letterSpacing: '0.08em',
          border: '1px solid #1A1714'
        }}>
          Go Home
        </Link>
      </div>
    </div>
  )
}

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid #E8E2D9'
}

const labelStyle = {
  fontSize: '12px',
  color: '#8B7355',
  letterSpacing: '0.06em'
}