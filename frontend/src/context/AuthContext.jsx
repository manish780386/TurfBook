// src/context/AuthContext.jsx
// Provides global auth state (current user) to the whole app.
// On app load we call GET /api/me/ to restore session from cookie.

import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)   // null = not logged in
  const [loading, setLoading] = useState(true)   // true while checking session

  // ── Initialise CSRF cookie + restore session on first load ────────────────
  useEffect(() => {
    const init = async () => {
      try {
        await api.get('/csrf/')  // pehle CSRF cookie lo
        const res = await api.get('/me/')
        setUser(res.data)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — import and call useAuth() in any component
export function useAuth() {
  return useContext(AuthContext)
}