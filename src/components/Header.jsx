import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="/logoAntey1.png"
            alt="Антей"
            className="h-8 w-auto"
          />
          
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-sm font-light text-gray-600">Система электронной подписи документов</span>
        </div>
        <div className="flex items-center gap-4">
          {user?.role === 'admin' && (
            <a href="/admin" className="text-sm text-red-600 hover:underline">
              Админ-Панель
            </a>
          )}
          <span className="text-sm text-gray-600">{user?.username || 'Пользователь'}</span>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-100 transition"
          >
            Выйти
          </button>
        </div>
      </div>
    </header>
  )
}