// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'

import Navbar          from './components/Navbar.jsx'
import Footer          from './components/Footer.jsx'
import ProtectedRoute  from './components/ProtectedRoute.jsx'

import HomePage        from './pages/HomePage.jsx'
import TurfsPage       from './pages/TurfsPage.jsx'
import TurfDetailPage  from './pages/TurfDetailPage.jsx'
import BookingPage     from './pages/BookingPage.jsx'
import MyBookingsPage  from './pages/MyBookingsPage.jsx'
import ContactPage     from './pages/ContactPage.jsx'
import LoginPage       from './pages/LoginPage.jsx'
import RegisterPage    from './pages/RegisterPage.jsx'
import NotFoundPage    from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />

          <main style={{ flex: 1 }}>
            <Routes>
              {/* Public */}
              <Route path="/"          element={<HomePage />} />
              <Route path="/turfs"     element={<TurfsPage />} />
              <Route path="/turfs/:id" element={<TurfDetailPage />} />
              <Route path="/contact"   element={<ContactPage />} />
              <Route path="/login"     element={<LoginPage />} />
              <Route path="/register"  element={<RegisterPage />} />

              {/* Protected — require login */}
              <Route
                path="/book/:turfId"
                element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute>
                    <MyBookingsPage />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}