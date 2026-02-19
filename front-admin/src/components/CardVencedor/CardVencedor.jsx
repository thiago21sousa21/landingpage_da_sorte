import './CardVencedor.css';

const CardVencedor = ({ dados }) => {
  if (!dados) return null;

  return (
    <div className="card-vencedor">
      <div className="card-header">
        {/* Exibe o nome do prêmio em destaque */}
        <h3>🎁 {dados.item_sorteado || "Prêmio Sorteado"}</h3>
      </div>
      <div className="card-body">
        <p className="vencedor-nome">{dados.vencedor?.nome}</p>
        <p className="vencedor-email">{dados.vencedor?.email}</p>
        <div className="numero-badge">
          № {dados.vencedor?.numero_sorteio}
        </div>
      </div>
      <div className="card-footer">
        Sorteado em: {new Date(dados.data_sorteio).toLocaleString()}
      </div>
    </div>
  );
};
export default CardVencedor;