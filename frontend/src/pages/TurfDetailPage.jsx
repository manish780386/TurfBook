// src/pages/TurfDetailPage.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import './TurfDetailPage.css'

const PLACEHOLDER = 'https://placehold.co/800x400/1a7a2e/ffffff?text=Cricket+Turf'

export default function TurfDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [turf, setTurf]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    api.get(`/turfs/${id}/`)
      .then(res => setTurf(res.data))
      .catch(() => setError('Turf not found.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="spinner-wrap" style={{ minHeight: '80vh' }}><div className="spinner" /></div>
  if (error)   return <div className="container page-padding"><div className="alert alert-error">{error}</div></div>

  let imageUrl = PLACEHOLDER
  if (turf.image) {
    if (turf.image.startsWith('http')) {
      imageUrl = turf.image.replace('127.0.0.1', 'localhost')
    } else {
      imageUrl = `http://localhost:8000${turf.image}`
    }
  }

  return (
    <div className="turf-detail page-padding">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &rsaquo; <Link to="/turfs">Turfs</Link> &rsaquo; <span>{turf.name}</span>
        </nav>

        <div className="detail-grid">
          {/* Left: image + info */}
          <div>
            <div className="detail-img-wrap">
              <img src={imageUrl} alt={turf.name} />
            </div>
            <div className="detail-card card" style={{ marginTop: 20, padding: 24 }}>
              <h1 className="detail-name">{turf.name}</h1>
              <p className="detail-location">📍 {turf.location}</p>
              <hr className="divider" />
              <h3 style={{ marginBottom: 8, fontSize: '1rem', color: 'var(--text-muted)' }}>About this turf</h3>
              <p style={{ lineHeight: 1.7, color: 'var(--text)' }}>{turf.description}</p>
            </div>
          </div>

          {/* Right: booking panel */}
          <div className="booking-panel card">
            <div className="booking-panel-header">
              <span className="panel-price">₹{turf.price_per_hour}<small>/hr</small></span>
              <span className="badge badge-green">Available</span>
            </div>
            <hr className="divider" />
            <ul className="detail-features">
              <li>✅ Instant booking confirmation</li>
              <li>✅ No advance payment required</li>
              <li>✅ Cancellation via admin</li>
            </ul>
            <hr className="divider" />
            {user ? (
              <Link to={`/book/${turf.id}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '13px' }}>
                🏏 Book This Turf
              </Link>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p style={{ marginBottom: 14, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Please login to book this turf.
                </p>
                <Link to="/login" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Login to Book
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}