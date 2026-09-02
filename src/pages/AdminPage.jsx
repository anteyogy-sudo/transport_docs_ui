import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'

export default function AdminPage() {
  const { user } = useAuth()
  const [message, setMessage] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('adminMessage')
    if (saved) setMessage(saved)
  }, [])

  const handleSave = () => {
    localStorage.setItem('adminMessage', message)
    alert('Сообщение сохранено!')
  }

  // Проверка роли
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-red-600">Доступ запрещён</h2>
          <p className="mt-2 text-gray-600">Только для администраторов</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Админ-панель</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Сообщение для сотрудников
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Введите сообщение, которое увидят все сотрудники..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Сохранить сообщение
          </button>
          {message && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700">
                ✅ Текущее сообщение: <span className="font-medium">{message}</span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}