import vaquejada from '../../../../assets/vaquejada.png'
import logo from '../../../../assets/logo.jpeg'
import {Link} from 'react-router-dom'
import './Hero.css'

const Hero = ({onOpenBusca}) => (
  <header className="hero-section">
    {/* Div preparada para futura imagem de fundo via CSS */}
    <div className="hero-background-overlay">
      <img src={vaquejada} alt="" />
    </div>
    
    <div className="container">
      {/* 🚀 NOVA DIV PARA A LOGO: Posicionada no topo esquerdo */}
      <div className="hero-logo-wrapper">
        <img src={logo} alt="Logo Arena LF" className="hero-logo-img" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">Vaquejada Arena LF 2026</h1>
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
        <button className="btn-recovery-link" onClick={onOpenBusca}>
            Já se inscreveu? Clique aqui para baixar seu comprovante.
        </button>
      </div>
    </div>
  </header>
);

export default Hero
