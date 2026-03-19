// src/pages/BookingPage.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import './BookingPage.css'

const ALL_SLOTS = [
  '06:00-07:00','07:00-08:00','08:00-09:00','09:00-10:00',
  '10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00',
  '14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00',
  '18:00-19:00','19:00-20:00','20:00-21:00','21:00-22:00',
]

const formatSlot = (s) => {
  const [start] = s.split('-')
  const [h, m]  = start.split(':')
  const hour    = parseInt(h)
  const period  = hour < 12 ? 'AM' : 'PM'
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${display}:${m} ${period}`
}

export default function BookingPage() {
  const { turfId } = useParams()
  const navigate   = useNavigate()

  const [turf, setTurf]           = useState(null)
  const [date, setDate]           = useState('')
  const [selectedSlot, setSlot]   = useState('')
  const [bookedSlots, setBooked]  = useState([])
  const [loading, setLoading]     = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess]     = useState('')
  const [error, setError]         = useState('')

  // Load turf info
  useEffect(() => {
    api.get(`/turfs/${turfId}/`)
      .then(res => setTurf(res.data))
      .catch(() => setError('Turf not found.'))
      .finally(() => setLoading(false))
  }, [turfId])

  // When date changes, fetch already-booked slots for that date
  useEffect(() => {
    if (!date) { setBooked([]); return }
    api.get(`/turfs/${turfId}/available-slots/?date=${date}`)
      .then(res => setBooked(res.data.booked_slots || []))
      .catch(() => setBooked([]))
    setSlot('')   // reset selected slot when date changes
  }, [date, turfId])

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!date || !selectedSlot) {
      setError('Please select a date and time slot.')
      return
    }
    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      await api.post('/bookings/', {
        turf: parseInt(turfId),
        date,
        time_slot: selectedSlot,
      })
      setSuccess('🎉 Booking confirmed! See you on the turf.')
      setTimeout(() => navigate('/my-bookings'), 2000)
    } catch (err) {
      const data = err.response?.data
      if (data?.non_field_errors) {
        setError(data.non_field_errors[0])
      } else if (typeof data === 'object') {
        setError(Object.values(data).flat().join(' '))
      } else {
        setError('Booking failed. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="spinner-wrap" style={{ minHeight: '80vh' }}><div className="spinner" /></div>

  return (
    <div className="booking-page page-padding">
      <div className="container" style={{ maxWidth: 760 }}>
        <h1 className="booking-title">Book a Slot</h1>
        {turf && (
          <div className="booking-turf-info card">
            <div>
              <strong>🏟️ {turf.name}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: 12 }}>
                📍 {turf.location}
              </span>
            </div>
            <span className="turf-price" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--green-dark)' }}>
              ₹{turf.price_per_hour}/hr
            </span>
          </div>
        )}

        {success && <div className="alert alert-success">{success}</div>}
        {error   && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="booking-form card">
          {/* Date picker */}
          <div className="form-group">
            <label htmlFor="date">📅 Select Date</label>
            <input
              id="date"
              type="date"
              min={today}
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>

          {/* Slot picker */}
          <div className="form-group">
            <label>⏰ Select Time Slot</label>
            {!date ? (
              <p className="slot-hint">Please select a date first.</p>
            ) : (
              <div className="slots-grid">
                {ALL_SLOTS.map(slot => {
                  const booked   = bookedSlots.includes(slot)
                  const selected = selectedSlot === slot
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={booked}
                      className={`slot-btn ${selected ? 'selected' : ''} ${booked ? 'booked' : ''}`}
                      onClick={() => !booked && setSlot(slot)}
                    >
                      {formatSlot(slot)}
                      {booked && <small>Booked</small>}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="slot-legend">
            <span className="legend-item available">Available</span>
            <span className="legend-item selected-leg">Selected</span>
            <span className="legend-item booked-leg">Booked</span>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting || !selectedSlot}
            style={{ width: '100%', justifyContent: 'center', marginTop: 8, padding: '13px', fontSize: '1rem' }}
          >
            {submitting ? 'Confirming…' : '✅ Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}