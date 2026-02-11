import { useState } from 'react';
import { participarSorteio } from '../../services/api'; 
import Comprovante from '../../components/Comprovante/Comprovante';
import './CadastroParticipante.css';

const CadastroParticipante = () => {
  // Estado único para o formulário seguindo o seu modelo fixo
const [formData, setFormData] = useState({ nome: '', cpf: '', email: '', endereco: '' });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' }); // tipo: 'success' ou 'error'
  const [dadosSucesso, setDadosSucesso] = useState(null); // Guardará o JSON da API

  // Função genérica para atualizar qualquer campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Mantém o que já estava lá
      [name]: value // Atualiza apenas o campo que mudou
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem({ texto: '', tipo: '' });

    try {
      const resultado = await participarSorteio(formData);
      setMensagem({ 
        texto: `Sucesso! Seu número da sorte é: ${resultado.numero_sorteio}`, 
        tipo: 'success' 
      });
      setDadosSucesso(resultado);
      // Opcional: limpar o formulário após sucesso
      setFormData({ nome: '', cpf: '', email: '', endereco: '' });
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
    <div className="cadastro-container">
      <h2>Cadastro no Sorteio</h2>
      {/* Feedback para o usuário */}
      {mensagem.texto && (
        <div className={`alerta ${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input 
          name="nome" 
          placeholder="Nome Completo" 
          value={formData.nome} 
          onChange={handleChange} 
          required 
        />
        <input 
          name="cpf" 
          placeholder="CPF (apenas 11 números)" 
          value={formData.cpf} 
          onChange={handleChange} 
          maxLength="11"
          required 
        />
        <input 
          name="email" 
          type="email" 
          placeholder="E-mail" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          name="endereco" 
          placeholder="Endereço" 
          value={formData.endereco} 
          onChange={handleChange} 
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Finalizar Cadastro'}
        </button>
      </form>
    </div>
  );
};

export default CadastroParticipante;