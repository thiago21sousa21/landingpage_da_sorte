import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  // Estado como objeto único 📦
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Função genérica para atualizar qualquer campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin Login 🔐</h2>
        {error && <p className="error-message">{error}</p>}
        
        <input
          type="text"
          name="username" // Corresponde à chave no objeto
          placeholder="Usuário"
          value={formData.username}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password" // Corresponde à chave no objeto
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;