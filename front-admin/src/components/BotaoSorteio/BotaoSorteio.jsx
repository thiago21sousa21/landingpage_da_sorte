import { useState } from 'react';
import api from '../../api/api';
import './BotaoSorteio.css';

const BotaoSorteio = ({ onSorteioRealizado }) => {
  const [loading, setLoading] = useState(false);

  const handleSortear = async () => {
    if (!confirm("Tem certeza que deseja realizar o sorteio agora?")) return;

    setLoading(true);
    try {
      const response = await api.post('/admin/sortear');
      // Passamos o objeto completo (id, vencedor, data) para o pai
      onSorteioRealizado(response.data); 
    } catch (error) {
      alert(error.response?.data?.detail || "Erro ao realizar sorteio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      className="btn-sorteio" 
      onClick={handleSortear} 
      disabled={loading}
    >
      {loading ? "Sorteando..." : "Realizar Sorteio Agora 🎲"}
    </button>
  );
};

export default BotaoSorteio;