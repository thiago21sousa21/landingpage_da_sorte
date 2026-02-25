import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css"
import Hero from "./components/Hero/Hero"
import About from "./components/About/About"
import Prizes from './components/Prizes/Prizes';
import Sweepstakes from './components/Sweepstakes/Sweepstakes';
import MusicAttractions from './components/MusicAttractions/MusicAttractiions';
import Features from './components/Features/Features';
import Gallery from './components/Gallery/Gallery';
import Sponsors from './components/Sponsors/Sponsors';
import Footer from './components/Footer/Footer';
import BuscaComprovante from './components/BuscaComprovante/BuscaComprovante';


/**
 * COMPONENTES INTERNOS (SUB-SEÇÕES)
 * Organizados para manter o Home.jsx limpo e modular.
 */

// 1. HERO SECTION
// 2. SOBRE O EVENTO
// 3. PREMIAÇÃO
// 4. SORTEIOS
// 5. ATRAÇÕES MUSICAIS
// 6. ESTRUTURA DO EVENTO
// 7. GALERIA
// 8. PATROCINADORES
// 9. RODAPÉ
/**
 * COMPONENTE PRINCIPAL (HOME PAGE)
 */
const Home = () => {

  const [modalBuscaAberto, setModalBuscaAberto] = useState(false);
  const [dadosEncontrados, setDadosEncontrados] = useState(null);

  // Se o usuário buscou e achou, a página "vira" o comprovante
  if (dadosEncontrados) {
    return <Comprovante dados={dadosEncontrados} />;
  }

  return (
    <main className="home-wrapper">
      {modalBuscaAberto && (
        <BuscaComprovante 
          onClose={() => setModalBuscaAberto(false)} 
          onSucesso={(dados) => setDadosEncontrados(dados)}
        />
      )}
      <Hero onOpenBusca={() => setModalBuscaAberto(true)}/>
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