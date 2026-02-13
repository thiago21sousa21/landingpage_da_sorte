import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css"

/**
 * COMPONENTES INTERNOS (SUB-SEÇÕES)
 * Organizados para manter o Home.jsx limpo e modular.
 */

// 1. HERO SECTION
const Hero = () => (
  <header className="hero-section">
    {/* Div preparada para futura imagem de fundo via CSS */}
    <div className="hero-background-overlay"></div>
    
    <div className="container">
      <div className="hero-content">
        <h1 className="hero-title">Vaquejada Real de Ouro 2026</h1>
        <p className="hero-tagline">Onde o sertão encontra a glória: O Grande Encontro da Tradição!</p>
        
        <div className="hero-event-details">
          <span className="event-date">15 a 20 de Setembro</span>
          <span className="event-location">Parque Major José Novais — Teresina, PI</span>
        </div>

        <div className="hero-actions">
          <Link to="/cadastro" className="btn btn-primary">
            Garantir Minha Inscrição
          </Link>
        </div>
      </div>
    </div>
  </header>
);

// 2. SOBRE O EVENTO
const About = () => (
  <section className="section about-section">
    <div className="container">
      <div className="about-grid">
        <div className="about-text">
          <h2 className="section-title">Nossa Tradição</h2>
          <p>
            Desde 1985, a Vaquejada Real de Ouro celebra a força do vaqueiro nordestino. 
            O que começou como uma reunião entre amigos tornou-se o maior evento de 
            derrubada de boi do Norte-Nordeste, preservando a cultura e o respeito ao animal.
          </p>
          <p>
            Em nossa 40ª edição, preparamos uma experiência que une a adrenalina da pista 
            com o conforto para toda a família sertaneja.
          </p>
        </div>
        
        {/* Espaço reservado para imagem lateral */}
        <div className="about-image-wrapper">
          <img src="" alt="Vaqueiro na pista - Imagem Ilustrativa" className="about-image" />
        </div>
      </div>
    </div>
  </section>
);

// 3. PREMIAÇÃO
const Prizes = () => (
  <section className="section prizes-section">
    <div className="container">
      <h2 className="section-title">Premiação Recorde</h2>
      
      <div className="prizes-grid">
        <div className="prize-card">
          <span className="prize-category">Categoria Profissional</span>
          <h3 className="prize-value">R$ 150.000,00</h3>
        </div>
        <div className="prize-card">
          <span className="prize-category">Categoria Amador</span>
          <h3 className="prize-value">R$ 50.000,00</h3>
        </div>
        <div className="prize-card">
          <span className="prize-category">Categoria Aspirante</span>
          <h3 className="prize-value">R$ 20.000,00</h3>
        </div>
      </div>

      {/* Área preparada para banner visual de premiação */}
      <div className="prize-banner">
        <div className="prize-banner-content">
          <img src="" alt="Banner Troféu Ouro" className="prize-banner-img" />
          <p>As melhores boiadas e os maiores prêmios da região.</p>
        </div>
      </div>
    </div>
  </section>
);

// 4. SORTEIOS
const Sweepstakes = () => (
  <section className="section sweepstakes-section">
    <div className="container">
      <div className="sweepstakes-highlight">
        <h2 className="section-title">Sorteios para Inscritos</h2>
        <p>Além da premiação na pista, todos os vaqueiros inscritos concorrem a:</p>
        
        <ul className="sweepstakes-list">
          <li><strong>01 Carro 0km</strong> no encerramento do evento</li>
          <li><strong>05 Motos</strong> para os 100 primeiros cadastrados</li>
          <li><strong>Kits de Selaria Profissional</strong> diariamente</li>
        </ul>
      </div>
    </div>
  </section>
);

// 5. ATRAÇÕES MUSICAIS
const MusicAttractions = () => (
  <section className="section attractions-section">
    <div className="container">
      <h2 className="section-title">Shows Musicais</h2>
      
      {/* Área para imagem de palco/show */}
      <div className="stage-image-container">
        <img src="" alt="Palco Principal - Vaquejada Real de Ouro" className="stage-img" />
      </div>

      <div className="artists-grid">
        <article className="artist-item">
          <h4 className="artist-name">Rei do Piseiro</h4>
          <p className="artist-day">Sexta-feira, 18/09</p>
        </article>
        <article className="artist-item">
          <h4 className="artist-name">Banda Galope de Ouro</h4>
          <p className="artist-day">Sábado, 19/09</p>
        </article>
        <article className="artist-item">
          <h4 className="artist-name">Rainha do Forró</h4>
          <p className="artist-day">Domingo, 20/09</p>
        </article>
      </div>
    </div>
  </section>
);

// 6. ESTRUTURA DO EVENTO
const Features = () => (
  <section className="section features-section">
    <div className="container">
      <h2 className="section-title">Estrutura e Comodidade</h2>
      
      <div className="features-grid">
        <div className="feature-item">
          <div className="feature-icon-placeholder"></div>
          <h4>Área VIP</h4>
          <p>Visão privilegiada da pista com open bar.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon-placeholder"></div>
          <h4>Espaço Kids</h4>
          <p>Recreação monitorada para os pequenos vaqueiros.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon-placeholder"></div>
          <h4>Praça de Alimentação</h4>
          <p>O melhor da culinária regional 24 horas.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon-placeholder"></div>
          <h4>Estacionamento</h4>
          <p>Segurança total para caminhões e veículos leves.</p>
        </div>
      </div>
    </div>
  </section>
);

// 7. GALERIA
const Gallery = () => (
  <section className="section gallery-section">
    <div className="container">
      <h2 className="section-title">Galeria do Evento</h2>
      
      {/* Grid preparado para imagens futuras */}
      <div className="gallery-grid">
        <div className="gallery-item"><img src="" alt="Momento da Vaquejada 1" /></div>
        <div className="gallery-item"><img src="" alt="Momento da Vaquejada 2" /></div>
        <div className="gallery-item"><img src="" alt="Momento da Vaquejada 3" /></div>
        <div className="gallery-item"><img src="" alt="Momento da Vaquejada 4" /></div>
        <div className="gallery-item"><img src="" alt="Momento da Vaquejada 5" /></div>
        <div className="gallery-item"><img src="" alt="Momento da Vaquejada 6" /></div>
      </div>
    </div>
  </section>
);

// 8. PATROCINADORES
const Sponsors = () => (
  <section className="section sponsors-section">
    <div className="container">
      <h3 className="sponsors-title">Patrocinadores Oficiais</h3>
      
      <div className="sponsors-logos">
        <div className="logo-slot">Patrocinador Master</div>
        <div className="logo-slot">Apoio Cultural</div>
        <div className="logo-slot">Parceria Logística</div>
        <div className="logo-slot">Governo do Estado</div>
      </div>
    </div>
  </section>
);

// 9. RODAPÉ
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-info">
          <h4>Vaquejada Real de Ouro</h4>
          <p>Contato: (86) 99999-0000</p>
          <p>Email: contato@vaquejadarealdeouro.com.br</p>
        </div>
        
        <div className="footer-social">
          <h4>Siga-nos</h4>
          <div className="social-links">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>YouTube</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Vaquejada Real de Ouro. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

/**
 * COMPONENTE PRINCIPAL (HOME PAGE)
 */
const Home = () => {
  return (
    <main className="home-wrapper">
      <Hero />
      <About />
      <Prizes />
      <Sweepstakes />
      <MusicAttractions />
      <Features />
      <Gallery />
      <Sponsors />
      <Footer />
    </main>
  );
};

export default Home;