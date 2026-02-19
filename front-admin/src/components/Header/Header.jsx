import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Importe o seu hook de autenticação
import './Header.css';

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="admin-header">
      <div className="header-content">
        <h2>Sorteio Admin 🏆</h2>
        <button onClick={handleLogout} className="btn-logout">
          Sair 👋
        </button>
      </div>
    </header>
  );
};

export default Header;