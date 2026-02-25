import { useState } from 'react';
import { buscarParticipantePorCPF } from '../../../../services/api';
import './BuscaComprovante.css';

const BuscaComprovante = ({ onClose, onSucesso }) => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleMaskCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      const dados = await buscarParticipantePorCPF(cpf);
      onSucesso(dados); // Passa os dados para o pai (LandingPage)
    } catch (err) {
      setErro(err.message || 'Participante não encontrado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="busca-overlay">
      <div className="busca-modal">
        <button className="btn-close" onClick={onClose}>&times;</button>
        <h3>Recuperar Inscrição</h3>
        <p>Informe seu CPF para baixar o comprovante.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(handleMaskCPF(e.target.value))}
            required
          />
          {erro && <span className="error-msg">{erro}</span>}
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Buscando...' : 'Localizar Comprovante'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuscaComprovante;