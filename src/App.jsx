import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DocumentsPage from './pages/DocumentsPage'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DocumentsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App