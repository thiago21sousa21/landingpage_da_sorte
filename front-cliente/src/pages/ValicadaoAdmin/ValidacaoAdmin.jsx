import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ValidacaoAdmin.css';

const ValidacaoAdmin = () => {
  const { token } = useParams(); // Pega o UUID da URL: /validar/:token
  const navigate = useNavigate();
  
  const [status, setStatus] = useState('processando'); // processando | sucesso | erro
  const [mensagem, setMensagem] = useState('Validando credencial...');
  const [dadosVaqueiro, setDadosVaqueiro] = useState(null);

  useEffect(() => {
    const validarEntrada = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        // Chamada para o novo endpoint PATCH do seu backend
        const response = await fetch(`${API_URL}/admin/validar-presenca/${token}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer SEU_TOKEN_AQUI' // Se o admin estiver logado
          }
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('sucesso');
          setMensagem('Check-in Realizado com Sucesso!');
          setDadosVaqueiro(data); // Assume que a API retorna os dados do vaqueiro validado
        } else {
          setStatus('erro');
          setMensagem(data.detail || 'Falha ao validar entrada.');
        }
      } catch (error) {
        setStatus('erro');
        setMensagem('Erro de conexão com o servidor.');
      }
    };

    if (token) {
      validarEntrada();
    }
  }, [token]);

  return (
    <main className={`validacao-page status-${status}`}>
      <div className="container">
        <div className="status-card">
          <div className="status-icon">
            {status === 'processando' && '⏳'}
            {status === 'sucesso' && '✅'}
            {status === 'erro' && '❌'}
          </div>

          <h2 className="status-title">{mensagem}</h2>

          {dadosVaqueiro && (
            <div className="vaqueiro-info">
              <p><strong>Vaqueiro:</strong> {dadosVaqueiro.nome}</p>
              <p><strong>Nº Sorteio:</strong> {dadosVaqueiro.numero_sorteio}</p>
            </div>
          )}

          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Voltar ao Início
          </button>
        </div>
      </div>
    </main>
  );
};

export default ValidacaoAdmin;