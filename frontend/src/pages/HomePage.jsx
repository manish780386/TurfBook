// src/pages/HomePage.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import TurfCard from '../components/TurfCard'
import './HomePage.css'

export default function HomePage() {
  const [turfs, setTurfs]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/turfs/')
      .then(res => setTurfs(res.data.slice(0, 3)))   // Show only 3 on home
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="home-page">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="hero-badge badge badge-accent">🏏 Book in 2 minutes</span>
          <h1>Find & Book the <br />Best Cricket Turfs</h1>
          <p>Affordable, verified cricket turfs near you. Pick your slot, show up, play.</p>
          <div className="hero-actions">
            <Link to="/turfs" className="btn btn-accent">Browse Turfs</Link>
            <Link to="/register" className="btn btn-outline-white">Sign Up Free</Link>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="how-it-works container">
        <h2 className="section-title">How It Works</h2>
        <div className="steps grid-3">
          {[
            { icon: '🔍', step: '1', title: 'Browse Turfs', desc: 'Explore turfs by location, price, and availability.' },
            { icon: '📅', step: '2', title: 'Pick a Slot',  desc: 'Select your date and preferred time slot.' },
            { icon: '✅', step: '3', title: 'Confirm & Play', desc: 'Booking saved instantly. Just show up and play!' },
          ].map(s => (
            <div className="step-card" key={s.step}>
              <div className="step-icon">{s.icon}</div>
              <span className="step-num">Step {s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Turfs ── */}
      <section className="featured-turfs">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Turfs</h2>
            <Link to="/turfs" className="btn btn-outline">View All →</Link>
          </div>

          {loading ? (
            <div className="spinner-wrap"><div className="spinner" /></div>
          ) : turfs.length === 0 ? (
            <div className="empty-state">
              <div className="icon">🏟️</div>
              <h3>No turfs yet</h3>
              <p>Turfs will appear here once added by admin.</p>
            </div>
          ) : (
            <div className="grid-3">
              {turfs.map(t => <TurfCard key={t.id} turf={t} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="container">
          <h2>Ready to play? Book your turf today.</h2>
          <p>Join hundreds of cricket enthusiasts who book with TurfBook every week.</p>
          <Link to="/register" className="btn btn-accent">Get Started Free</Link>
        </div>
      </section>
    </div>
  )
}