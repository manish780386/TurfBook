// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="page-padding" style={{ textAlign: 'center', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <div style={{ fontSize: '5rem', marginBottom: 16 }}>🏏</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', color: 'var(--green-dark)', marginBottom: 8 }}>404</h1>
        <h2 style={{ fontSize: '1.4rem', marginBottom: 12, color: 'var(--text)' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>
          Looks like this page got bowled out. Let's head back to the crease.
        </p>
        <Link to="/" className="btn btn-primary">← Back to Home</Link>
      </div>
    </div>
  )
}