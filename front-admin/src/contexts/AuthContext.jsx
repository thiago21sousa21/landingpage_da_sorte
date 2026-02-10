import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Verificação Inicial: O usuário já estava logado?
  useEffect(() => {
    const recoveredUser = localStorage.getItem('@App:user');
    const token = localStorage.getItem('@App:token');

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
    }
    setLoading(false);
  }, []);

  // 2. Função de Login
  const login = async (username, password) => {
    // O FastAPI com OAuth2 espera um FormData
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await api.post('/admin/login', formData);
      const { access_token } = response.data;

      // Guardamos o essencial
      localStorage.setItem('@App:token', access_token);
      localStorage.setItem('@App:user', JSON.stringify({ username }));
      
      setUser({ username });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.detail || "Erro no login" };
    }
  };

  const logout = () => {
    localStorage.removeItem('@App:token');
    localStorage.removeItem('@App:user');
    setUser(null);
  };

return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o uso
export const useAuth = () => useContext(AuthContext);