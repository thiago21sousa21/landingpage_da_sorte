import { useState } from 'react';
import api from '../../api/api';
import './BotaoSorteio.css';

const BotaoSorteio = ({ onSorteioRealizado }) => {
  const [loading, setLoading] = useState(false);
  const [descricao, setDescricao] = useState(''); 

  const handleSortear = async (e) => {
    e.preventDefault();
    if (!descricao) return alert("Digite o nome do prêmio antes de sortear!");
    if (!confirm("Tem certeza que deseja realizar o sorteio agora?")) return;

    setLoading(true);
    try {
      const response = await api.post('/admin/sortear', { item_sorteado: descricao });  
      onSorteioRealizado(response.data);
      setDescricao('');
    } catch (error) {
      alert(error.response?.data?.detail || "Erro ao realizar sorteio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="sorteio-form" onSubmit={handleSortear}>
      <input 
        type="text" 
        placeholder="Ex: 1º Prêmio - iPhone" 
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        disabled={loading}
      />
      <button className="btn-sorteio" type="submit" disabled={loading}>
        {loading ? "Sorteando..." : "Realizar Sorteio 🎲"}
      </button>
    </form>
  );
};

export default BotaoSorteio;