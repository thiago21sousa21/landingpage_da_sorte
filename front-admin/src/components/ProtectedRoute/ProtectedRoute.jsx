import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './ProtectedRoute.css'; 

const ProtectedRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-container">Carregando...</div>;
  }

  if (!authenticated) {
    // Para qual rota devemos enviar o usuário se ele não tiver o token?
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;