import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { participarSorteio } from '../../services/api';
import Comprovante from '../LandingPage/components/Comprovante/Comprovante';
import './CadastroParticipante.css';

const CadastroParticipante = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome: '', cpf: '', email: '', endereco: '' });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [dadosSucesso, setDadosSucesso] = useState(null);

  // ✨ Função para aplicar a máscara visual de CPF
  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os 3 primeiros dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os 6 primeiros dígitos
      .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca hífen após os 9 primeiros dígitos
      .replace(/(-\d{2})\d+?$/, '$1'); // Limita em 11 dígitos
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Se o campo for CPF, aplicamos a máscara antes de salvar no estado
    if (name === 'cpf') {
      setFormData({ ...formData, [name]: maskCPF(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem({ texto: '', tipo: '' });

    // 🧹 LIMPEZA: Remove pontos e traços antes de enviar para a API
    const dadosParaEnviar = {
      ...formData,
      cpf: formData.cpf.replace(/\D/g, '') // Envia apenas os 11 números
    };

    try {
      const resultado = await participarSorteio(dadosParaEnviar);
      setDadosSucesso(resultado);
    } catch (error) {
      setMensagem({ texto: error.message, tipo: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (dadosSucesso) {
    return <Comprovante dados={dadosSucesso} />;
  }

  return (
    <section className="section cadastro-page">
      <div className="container">
        <header className="cadastro-header">
          <button className="btn-back" onClick={() => navigate('/')}>
            ← Voltar para a Home
          </button>
          <h2 className="section-title">Inscrição de Vaqueiro</h2>
        </header>

        {mensagem.texto && <div className={`alerta ${mensagem.tipo}`}>{mensagem.texto}</div>}

        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome Completo</label>
            <input name="nome" value={formData.nome} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input 
              name="cpf" 
              placeholder="000.000.000-00"
              value={formData.cpf} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Endereço</label>
            <input name="endereco" value={formData.endereco} onChange={handleChange} />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processando...' : 'Finalizar Inscrição'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CadastroParticipante;