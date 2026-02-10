import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// O Interceptador: roda antes de QUALQUER chamada à API
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@App:token'); // Pegamos o token do storage

  if (token) {
    // Se existir, "carimbamos" a requisição com o Bearer Token
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptador de RESPOSTA: roda quando a API nos devolve algo
api.interceptors.response.use(
  (response) => response, // Se a resposta for sucesso, só passa adiante
  (error) => {
    // Se o erro for 401, significa que o token "morreu" ou é inválido
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('@App:token');
      localStorage.removeItem('@App:user');
      
      // Forçamos um recarregamento para que o AuthContext perceba a mudança
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);
export default api;