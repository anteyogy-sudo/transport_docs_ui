
import { useState } from 'react'
import { adminLogin } from '../api/client'

export default function LoginPage() {
  const [inn, setInn] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      
      const response = await adminLogin(inn, password)

      if (response.success) {
        localStorage.setItem('token', 'admin-fake-token')
        localStorage.setItem('user', JSON.stringify({ inn, role: 'admin' }))
        window.location.replace('/')
        return
      }
    } catch (err) {
  // Если ошибка сети FastAPI недоступен
  if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
    console.warn('FastAPI недоступен, обычный вход через заглушку')
    // переходим к обычному входу
  } else {
    // ошибка 401 — просто пробуем обычный вход
    console.log('Не админ, пробуем обычный вход')
  }
}

    // Обычный пользователь
    localStorage.setItem('token', 'fake-token')
    localStorage.setItem('user', JSON.stringify({ inn, role: 'user' }))
    window.location.replace('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Вход в систему</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">ИНН</label>
            <input
              type="text"
              value={inn}
              onChange={(e) => setInn(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}