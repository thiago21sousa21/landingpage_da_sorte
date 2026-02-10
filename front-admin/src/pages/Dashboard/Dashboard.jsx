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
  const carregarDadosIniciais = async () => {
    try {
      // Busca participantes e o último sorteio em paralelo
      const [resParticipantes, resSorteio] = await Promise.all([
        api.get('/admin/participantes'),
        api.get('/admin/ultimo-sorteio') // Verifique se esta rota existe no seu FastAPI
      ]);

      setParticipantes(resParticipantes.data);
      
      // Se já houve um sorteio, ele aparecerá mesmo após o F5!
      if (resSorteio.data) {
        setResultadoSorteio(resSorteio.data);
      }
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    } finally {
      setLoading(false);
    }
  };

  carregarDadosIniciais();
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