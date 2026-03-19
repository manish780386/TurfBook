// src/components/Navbar.jsx
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await api.post('/logout/')
    } catch { /* ignore */ }
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path ? 'active' : ''
  const close = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={close}>
          <span className="logo-icon">🏏</span>
          <span className="logo-text">TurfBook</span>
        </Link>

        {/* Hamburger (mobile) */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        {/* Links */}
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/"        className={isActive('/')}        onClick={close}>Home</Link></li>
          <li><Link to="/turfs"   className={isActive('/turfs')}   onClick={close}>Turfs</Link></li>
          <li><Link to="/contact" className={isActive('/contact')} onClick={close}>Contact</Link></li>

          {user ? (
            <>
              <li>
                <Link to="/my-bookings" className={isActive('/my-bookings')} onClick={close}>
                  My Bookings
                </Link>
              </li>
              <li className="navbar-user">
                <span className="user-greeting">👤 {user.username}</span>
                <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login"    className={`btn btn-outline btn-sm ${isActive('/login')}`}    onClick={close}>Login</Link></li>
              <li><Link to="/register" className={`btn btn-primary btn-sm ${isActive('/register')}`} onClick={close}>Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}