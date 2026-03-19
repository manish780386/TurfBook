// src/components/Footer.jsx
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">🏏 TurfBook</span>
          <p>Book your favourite cricket turf in minutes.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/turfs">Turfs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Account</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/my-bookings">My Bookings</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TurfBook. Built for cricket lovers.</p>
      </div>
    </footer>
  )
}