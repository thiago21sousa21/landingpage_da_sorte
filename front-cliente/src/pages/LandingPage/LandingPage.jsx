import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  // Inicializamos o hook para poder navegar entre as rotas
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="hero">
        <h1>Sorteio de Natal: Ganhe um Setup Gamer! 🎮</h1>
        <p>Participe da nossa promoção exclusiva e concorra a prêmios incríveis.</p>
      </header>

      <section className="how-it-works">
        <h2>Como funciona?</h2>
        <div className="step-cards">
          <div className="card">
            <h3>1. Cadastre-se</h3>
            <p>Preencha seus dados reais (CPF, E-mail e Endereço).</p>
          </div>
          <div className="card">
            <h3>2. Gere seu Número</h3>
            <p>Nosso sistema gera automaticamente seu número da sorte.</p>
          </div>
          <div className="card">
            <h3>3. Torça!</h3>
            <p>O sorteio será realizado ao vivo no dia 25/12.</p>
          </div>
        </div>
      </section>

      <footer className="cta-section">
        {/* Usamos o navigate para levar o usuário à rota /cadastro */}
        <button 
          className="btn-primary" 
          onClick={() => navigate('/cadastro')}
        >
          Quero participar agora! 🚀
        </button>
      </footer>
    </div>
  );
};

export default LandingPage;