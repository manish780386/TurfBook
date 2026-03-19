// src/components/ProtectedRoute.jsx
// Wraps routes that require a logged-in user.
// Redirects to /login if not authenticated.

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="spinner-wrap" style={{ minHeight: '60vh' }}>
        <div className="spinner" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}