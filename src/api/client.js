import axios from 'axios'

const API_BASE = 'http://localhost:8000'


const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)


// 2. АДМИН-API (без токенов)

const adminApi = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function adminLogin(inn, password) {
  const response = await adminApi.post('/admin/login', { inn, password })
  return response.data
}




export async function loginUser(inn, password) {
  
  return { access_token: 'dev-fake-jwt-token-12345' }
}


export async function fetchDocuments() {
  const response = await api.get('/api/documents')
  return response.data
}

export async function signDocument(docId) {
  const response = await api.post(`/api/documents/${docId}/sign`)
  return response.data
}

//Админка без токена
export async function getAdminMessage() {
  const response = await adminApi.get('/admin/message')
  return response.data.message
}

export async function setAdminMessage(message) {
  const response = await adminApi.post('/admin/message', { message })
  return response.data
}

export default api