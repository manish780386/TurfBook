// src/components/TurfCard.jsx
import { Link } from 'react-router-dom'
import './TurfCard.css'

const PLACEHOLDER = 'https://placehold.co/400x220/1a7a2e/ffffff?text=Cricket+Turf'

export default function TurfCard({ turf }) {
  let imageUrl = PLACEHOLDER
  
  if (turf.image) {
    // Agar full URL aa raha hai API se
    if (turf.image.startsWith('http')) {
      imageUrl = turf.image.replace('127.0.0.1', 'localhost')
    } else {
      // Agar sirf path aa raha hai
      imageUrl = `http://localhost:8000${turf.image}`
    }
  }

  return (
    <div className="turf-card card">
      <div className="turf-card-img-wrap">
        <img src={imageUrl} alt={turf.name} loading="lazy" />
      </div>
      <div className="turf-card-body">
        <h3 className="turf-card-name">{turf.name}</h3>
        <p className="turf-card-location">📍 {turf.location}</p>
        <p className="turf-card-desc">{turf.description?.slice(0, 90)}{turf.description?.length > 90 ? '…' : ''}</p>
        <div className="turf-card-footer">
          <span className="turf-price">₹{turf.price_per_hour}<small>/hr</small></span>
          <Link to={`/turfs/${turf.id}`} className="btn btn-primary btn-sm">Book Now →</Link>
        </div>
      </div>
    </div>
  )
}