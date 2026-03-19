// src/pages/LoginPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import './AuthPages.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()

  const [form, setForm]           = useState({ username: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]         = useState('')

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await api.post('/login/', form)
      login(res.data.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check your credentials.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page page-padding">
      <div className="auth-card card">
        <div className="auth-header">
          <span className="auth-icon">🏏</span>
          <h1>Welcome Back</h1>
          <p>Login to your TurfBook account</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username" name="username" type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password" name="password" type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={submitting}
          >
            {submitting ? 'Logging in…' : 'Login →'}
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account?{' '}
          <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}