
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import DocumentsPage from './pages/DocumentsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/admin" element={
       <ProtectedRoute>
       <AdminPage />
       </ProtectedRoute>
       } />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DocumentsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to={token ? '/' : '/login'} />} />

      
    </Routes>
  );
}

export default App;