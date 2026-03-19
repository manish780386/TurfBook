// src/pages/RegisterPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import './AuthPages.css'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm]           = useState({ username: '', email: '', password: '', confirm: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState('')

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await api.post('/register/', {
        username: form.username,
        email: form.email,
        password: form.password,
      })
      setSuccess('Registration successful! Redirecting to login…')
      setTimeout(() => navigate('/login'), 1800)
    } catch (err) {
      const data = err.response?.data
      if (typeof data === 'object') {
        setError(Object.values(data).flat().join(' '))
      } else {
        setError('Registration failed. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page page-padding">
      <div className="auth-card card">
        <div className="auth-header">
          <span className="auth-icon">🏏</span>
          <h1>Create Account</h1>
          <p>Join TurfBook and start booking today</p>
        </div>

        {success && <div className="alert alert-success">{success}</div>}
        {error   && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username" name="username" type="text"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              required autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
            <input
              id="email" name="email" type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(min. 6 characters)</span></label>
            <input
              id="password" name="password" type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required minLength={6}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              id="confirm" name="confirm" type="password"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={submitting}
          >
            {submitting ? 'Creating account…' : 'Register →'}
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{' '}
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}