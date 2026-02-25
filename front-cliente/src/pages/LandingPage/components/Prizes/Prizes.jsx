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
export default Prizes;