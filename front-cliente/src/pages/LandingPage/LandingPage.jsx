import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const ProductLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* SEÇÃO HERO: Foco no Desejo */}
      <header className="hero-section">
        <div className="hero-content">
          <span className="badge">Oportunidade Única</span>
          <h1>O Futuro na sua Mão: <span>Smartphone Ultra Pro</span></h1>
          <p>Câmera de 200MP, bateria que dura 2 dias e o processador mais rápido do mercado. Este poderia ser seu, sem pagar nada.</p>
          <button className="btn-primary" onClick={() => navigate('/cadastro')}>
            Quero concorrer agora! 🚀
          </button>
        </div>
        <div className="hero-image">
          {/* Imagine aqui uma imagem impactante do produto */}
          <img src="https://via.placeholder.com/500x600" alt="Smartphone Ultra Pro" />
        </div>
      </header>

      {/* SEÇÃO DE BENEFÍCIOS: Por que o usuário quer esse produto? */}
      <section className="product-features">
        <h2>Por que você precisa deste Smartphone?</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <span className="icon">📸</span>
            <h3>Fotos de Cinema</h3>
            <p>Capture cada detalhe com o novo sensor de ultra-resolução.</p>
          </div>
          <div className="feature-item">
            <span className="icon">⚡</span>
            <h3>Carga Ultra-Rápida</h3>
            <p>De 0 a 100% em apenas 20 minutos de carregamento.</p>
          </div>
          <div className="feature-item">
            <span className="icon">🎮</span>
            <h3>Performance Gamer</h3>
            <p>Rode qualquer jogo no ultra sem travamentos ou aquecimento.</p>
          </div>
        </div>
      </section>

      {/* SEÇÃO DO SORTEIO: Como participar */}
      <section className="giveaway-steps">
        <div className="steps-container">
          <h2>Como levar essa máquina para casa?</h2>
          <p className="subtitle">Siga os passos abaixo e garanta seu número da sorte.</p>
          
          <div className="step-cards">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Registro Seguro</h3>
              <p>Cadastre seus dados básicos para validarmos sua participação oficial.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Número da Sorte</h3>
              <p>O sistema gera seu código único de sorteio instantaneamente após o cadastro.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Acompanhe ao Vivo</h3>
              <p>O sorteio será realizado via Instagram oficial com transparência total.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO FINAL: CTA de Fechamento */}
      <footer className="final-cta">
        <div className="cta-box">
          <h2>Não deixe a sorte passar!</h2>
          <p>Mais de 5.000 pessoas já garantiram seu número. As inscrições encerram em breve.</p>
          <button className="btn-secondary" onClick={() => navigate('/cadastro')}>
            Garantir minha vaga no sorteio
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ProductLandingPage;