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

export default About;