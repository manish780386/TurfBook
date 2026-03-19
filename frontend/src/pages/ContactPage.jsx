// src/pages/ContactPage.jsx
import { useState } from 'react'
import api from '../api/axios'
import './ContactPage.css'

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError]     = useState('')

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      const res = await api.post('/contact/', form)
      setSuccess(res.data.message || 'Query submitted successfully!')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      const data = err.response?.data
      if (typeof data === 'object') {
        setError(Object.values(data).flat().join(' '))
      } else {
        setError('Failed to submit. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Have a question? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="container contact-layout" style={{ paddingBottom: 64 }}>
        {/* Info cards */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28, lineHeight: 1.7 }}>
            Whether you have a question about a turf, need help with a booking, or just want to say hello — fill out the form and we'll get back to you.
          </p>
          {[
            { icon: '📍', label: 'Address',  value: 'Sports Complex, Main Road, Your City' },
            { icon: '📞', label: 'Phone',    value: '+91 98765 43210' },
            { icon: '✉️', label: 'Email',    value: 'support@turfbook.in' },
            { icon: '🕐', label: 'Hours',    value: 'Mon–Sun: 6:00 AM – 10:00 PM' },
          ].map(item => (
            <div className="contact-info-item" key={item.label}>
              <span className="contact-icon">{item.icon}</span>
              <div>
                <strong>{item.label}</strong>
                <p>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="contact-form-wrap card">
          <h2 style={{ marginBottom: 22, color: 'var(--green-dark)' }}>Send a Message</h2>

          {success && <div className="alert alert-success">{success}</div>}
          {error   && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name" name="name" type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email" name="email" type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message"
                placeholder="Write your message here…"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '1rem' }}
            >
              {submitting ? 'Sending…' : '📨 Send Message'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}