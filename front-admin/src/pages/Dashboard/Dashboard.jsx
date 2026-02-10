import { useEffect, useState } from 'react';
import api from '../../api/api';
import './Dashboard.css';
import BotaoSorteio from '../../components/BotaoSorteio/BotaoSorteio';
import CardVencedor from '../../components/CardVencedor/CardVencedor';

const Dashboard = () => {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultadoSorteio, setResultadoSorteio] = useState(null);

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        const response = await api.get('/admin/participantes'); // Ajuste conforme sua rota
        setParticipantes(response.data);
      } catch (error) {
        console.error("Erro ao buscar participantes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipantes();
  }, []);

  if (loading) return <div className="loading">Carregando painel...</div>;

  return (
    <div className="dashboard-container">
      <h1>Painel Administrativo 🏆</h1>
      <CardVencedor dados={resultadoSorteio} />
      <BotaoSorteio onSorteioRealizado={setResultadoSorteio} />
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Número</th>
          </tr>
        </thead>
        <tbody>
          {participantes.map(p => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.email}</td>
              <td>{p.numero_sorteio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      
    </div>
  );
};

export default Dashboard;