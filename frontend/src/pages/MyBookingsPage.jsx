// src/pages/MyBookingsPage.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import './MyBookingsPage.css'

const formatSlot = (s) => {
  const [start, end] = s.split('-')
  const fmt = (t) => {
    const [h, m] = t.split(':')
    const hour   = parseInt(h)
    const period = hour < 12 ? 'AM' : 'PM'
    const disp   = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${disp}:${m} ${period}`
  }
  return `${fmt(start)} – ${fmt(end)}`
}

const formatDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

export default function MyBookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    api.get('/bookings/')
      .then(res => setBookings(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const upcoming = bookings.filter(b => new Date(b.date) >= new Date(new Date().toDateString()))
  const past     = bookings.filter(b => new Date(b.date) <  new Date(new Date().toDateString()))

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>My Bookings</h1>
          <p>Welcome, {user?.username}! Here are all your turf bookings.</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 64 }}>
        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📅</div>
            <h3>No bookings yet</h3>
            <p>You haven't booked any turf. Go find one!</p>
            <Link to="/turfs" className="btn btn-primary" style={{ marginTop: 20 }}>Browse Turfs</Link>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div className="bookings-section">
                <h2 className="bookings-section-title">Upcoming ({upcoming.length})</h2>
                <div className="bookings-list">
                  {upcoming.map(b => <BookingCard key={b.id} booking={b} upcoming />)}
                </div>
              </div>
            )}
            {past.length > 0 && (
              <div className="bookings-section">
                <h2 className="bookings-section-title" style={{ color: 'var(--text-muted)' }}>Past ({past.length})</h2>
                <div className="bookings-list">
                  {past.map(b => <BookingCard key={b.id} booking={b} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

function BookingCard({ booking: b, upcoming }) {
  let imageUrl = 'https://placehold.co/80x80/1a7a2e/ffffff?text=🏏'

  if (b.turf_detail?.image) {
    if (b.turf_detail.image.startsWith('http')) {
      imageUrl = b.turf_detail.image.replace('127.0.0.1', 'localhost')
    } else {
      imageUrl = `http://localhost:8000${b.turf_detail.image}`
    }
  }

  return (
    <div className={`booking-card card ${upcoming ? '' : 'past'}`}>
      <img src={imageUrl} alt={b.turf_detail?.name} className="booking-card-img" />
      <div className="booking-card-body">
        <div className="booking-card-top">
          <h3>{b.turf_detail?.name || `Turf #${b.turf}`}</h3>
          <span className={`badge ${upcoming ? 'badge-green' : 'badge-accent'}`}>
            {upcoming ? '🟢 Upcoming' : '⏱ Completed'}
          </span>
        </div>
        <p className="booking-meta">📍 {b.turf_detail?.location}</p>
        <div className="booking-details">
          <span>📅 {formatDate(b.date)}</span>
          <span>⏰ {formatSlot(b.time_slot)}</span>
          <span>💰 ₹{b.turf_detail?.price_per_hour}/hr</span>
        </div>
      </div>
    </div>
  )
}