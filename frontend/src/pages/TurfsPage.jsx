// src/pages/TurfsPage.jsx
import { useEffect, useState } from 'react'
import api from '../api/axios'
import TurfCard from '../components/TurfCard.jsx'

export default function TurfsPage() {
  const [turfs, setTurfs]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')

  useEffect(() => {
    api.get('/turfs/')
      .then(res => setTurfs(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = turfs.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>All Turfs</h1>
          <p>Find the perfect cricket turf for your next game</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 64 }}>
        {/* Search */}
        <div style={{ maxWidth: 420, marginBottom: 32 }}>
          <input
            type="text"
            placeholder="🔍  Search by name or location…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius)',
              fontSize: '0.95rem',
              outline: 'none',
              fontFamily: 'var(--font-body)',
            }}
          />
        </div>

        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🏟️</div>
            <h3>{search ? 'No turfs match your search' : 'No turfs available yet'}</h3>
            <p>Try a different search term or check back later.</p>
          </div>
        ) : (
          <>
            <p style={{ marginBottom: 20, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Showing {filtered.length} turf{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="grid-3">
              {filtered.map(t => <TurfCard key={t.id} turf={t} />)}
            </div>
          </>
        )}
      </div>
    </>
  )
}