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
export default MusicAttractions;