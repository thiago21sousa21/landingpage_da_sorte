import { useEffect, useState } from 'react';
import api from '../../api/api';
import './Dashboard.css';
import BotaoSorteio from '../../components/BotaoSorteio/BotaoSorteio';
import CardVencedor from '../../components/CardVencedor/CardVencedor';

const Dashboard = () => {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultadoSorteio, setResultadoSorteio] = useState(null);
  const [sorteiosRealizados, setSorteiosRealizados] = useState([]);

useEffect(() => {
  const carregarDadosIniciais = async () => {
    try {
      setLoading(true);

      // Buscamos os participantes (obrigatório)
      const resParticipantes = await api.get('/admin/participantes');
      setParticipantes(resParticipantes.data);

      // Buscamos os sorteios (opcional, se falhar não quebra a tabela)
      try {
        const resSorteios = await api.get('/admin/todos-sorteios');
        setSorteiosRealizados(resSorteios.data);
        
        if (resSorteios.data && resSorteios.data.length > 0) {
          setResultadoSorteio(resSorteios.data[0]);
        }
      } catch (e) {
        console.warn("A rota de sorteios falhou, mas vou listar os participantes:", e);
      }

    } catch (error) {
      console.error("Erro crítico ao carregar participantes:", error);
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
      {/* No seu JSX, acima da tabela */}
      <div className="vencedores-container">
        {sorteiosRealizados.map(s => (
          <CardVencedor key={s.id} dados={s} />
        ))}
      </div>
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