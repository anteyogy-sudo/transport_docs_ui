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


// export async function loginUser(username, password) {
//   const formData = new URLSearchParams()
//   formData.append('username', username)
//   formData.append('password', password)

//   const response = await api.post('/auth/login', formData, {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   })
//   return response.data
// }


export async function loginUser(inn, password) {
  // const response = await api.post('/auth/login', {
  //   inn: inn,   
  //   password: password
  // })
  // return response.data
   return { access_token: 'fake-token-12345' }
}


export async function fetchDocuments() {
  const response = await api.get('/api/documents')
  return response.data
}

export async function signDocument(docId) {
  const response = await api.post(`/api/documents/${docId}/sign`)
  return response.data
}

export default api