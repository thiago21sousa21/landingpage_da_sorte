import { useEffect, useState } from 'react';
import api from '../../api/api';
import './Dashboard.css';
import BotaoSorteio from '../../components/BotaoSorteio/BotaoSorteio';
import CardVencedor from '../../components/CardVencedor/CardVencedor';
import Header from '../../components/Header/Header'; // Importando o Header

const Dashboard = () => {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorteiosRealizados, setSorteiosRealizados] = useState([]);

  // Função para verificar se o ID está na lista de ganhadores
  const jaFoiSorteado = (participanteId) => {
    return sorteiosRealizados.some(s => s.vencedor_id === participanteId);
  };

  // Função para atualizar a lista assim que um novo sorteio for feito
  const atualizarAposSorteio = (novoVencedor) => {
    setSorteiosRealizados(prev => [novoVencedor, ...prev]);
  };

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        setLoading(true);
        const resParticipantes = await api.get('/admin/participantes');
        setParticipantes(resParticipantes.data);

        try {
          const resSorteios = await api.get('/admin/todos-sorteios');
          setSorteiosRealizados(resSorteios.data);
        } catch (e) {
          console.warn("Falha ao carregar sorteios anteriores.");
        }
      } catch (error) {
        console.error("Erro crítico:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarDadosIniciais();
  }, []);

  if (loading) return <div className="loading">Carregando painel...</div>;

  return (
    <>
      <Header /> {/* Adicionado o topo com Logout */}
      <div className="dashboard-container">
        <h1>Painel Administrativo 🏆</h1>
        
        <div className="vencedores-container">
          {sorteiosRealizados.map(s => (
            <CardVencedor key={s.id} dados={s} />
          ))}
        </div>

        {/* Passamos a função de atualizar a lista para o botão */}
        <BotaoSorteio onSorteioRealizado={atualizarAposSorteio} />
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Número</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {participantes.map(p => {
              // ✅ AQUI ESTAVA O ERRO: Precisamos definir 'sorteado' para cada linha
              const sorteado = jaFoiSorteado(p.id); 
              
              return (
                <tr key={p.id} className={sorteado ? 'row-sorteado' : ''}>
                  <td>{p.nome}</td>
                  <td>{p.email}</td>
                  <td>{p.numero_sorteio}</td>
                  <td>
                    {sorteado ? (
                      <span className="badge-ganhador">Sorteado 🎉</span>
                    ) : (
                      <span className="badge-espera">Em espera</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;