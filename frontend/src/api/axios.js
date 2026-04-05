import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',  // 127.0.0.1 ki jagah localhost
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

// Cookie se CSRF token nikalta hai
function getCookie(name) {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

// Har POST/PUT/DELETE request pe CSRF token attach karo
api.interceptors.request.use((config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
    const csrf = getCookie('csrftoken')
    if (csrf) {
      config.headers['X-CSRFToken'] = csrf
    }
  }
  return config
})

export default api