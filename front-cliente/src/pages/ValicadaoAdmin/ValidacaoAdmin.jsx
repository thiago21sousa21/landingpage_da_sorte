import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ValidacaoAdmin.css';

const ValidacaoAdmin = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState('processando');
  const [mensagem, setMensagem] = useState('Validando credencial...');
  const [dadosVaqueiro, setDadosVaqueiro] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
  const validarEntrada = async () => {
    const chaveSalva = localStorage.getItem('admin_key');

    try {
      const response = await fetch(`${API_URL}/admin/validar-presenca/${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': chaveSalva
        }
      });

      // Se a resposta for 401 ou 403, aí sim redirecionamos
      if (response.status === 401 || response.status === 403) {
        
        alert("Chave Inválida! Verifique as configurações.");
        navigate('/admin-config');
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setStatus('sucesso');
        setMensagem('Check-in Realizado!');
        setDadosVaqueiro(data);

        // Timer de 3 segundos para voltar ao scanner automaticamente
        setTimeout(() => {
          navigate('/validar');
        }, 3000);
      } else {
        // Erros de negócio (QR já usado, etc) não redirecionam
        setStatus('error');
        setMensagem(data.detail || 'Falha ao validar entrada.');
      }
    } catch (error) {
      
      setStatus('error');
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  if (token && status === 'processando') {
    validarEntrada();
  }
}, [token, API_URL, navigate, status]);

  return (
    <main className={`validacao-page status-${status}`}>
      <div className="container">
        <div className="status-card">
          <div className="status-icon">
            {status === 'processando' && '⏳'}
            {status === 'sucesso' && '✅'}
            {status === 'error' && '❌'}
          </div>

          <h2 className="status-title">{mensagem}</h2>

          {dadosVaqueiro && (
            <div className="vaqueiro-info">
              <p><strong>Vaqueiro:</strong> {dadosVaqueiro.nome}</p>
              <p><strong>Nº Sorteio:</strong> {dadosVaqueiro.numero_sorteio}</p>
            </div>
          )}

          <div className="admin-actions">
            {status !== 'processando' && (
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/validar')}
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                {status === 'sucesso' ? 'Validar Próximo' : 'Tentar Novamente'}
              </button>
            )}

            <button 
              className="btn-back" 
              onClick={() => navigate('/')}
              style={{ background: 'none', border: 'none', color: 'var(--color-terracotta)', cursor: 'pointer' }}
            >
              Voltar para a Home
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ValidacaoAdmin;