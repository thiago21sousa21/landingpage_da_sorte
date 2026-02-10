import './CardVencedor.css';

const CardVencedor = ({ dados }) => {
  if (!dados) return null;

  const { vencedor, data_sorteio } = dados;

  return (
    <div className="card-vencedor-container">
      <div className="card-header">
        <span>🎉 Vencedor Encontrado!</span>
      </div>
      <div className="card-body">
        <h2>{vencedor.nome}</h2>
        <p><strong>Email:</strong> {vencedor.email}</p>
        <p className="numero-sorte">№ {vencedor.numero_sorteio}</p>
      </div>
      <div className="card-footer">
        Sorteio realizado em: {new Date(data_sorteio).toLocaleString()}
      </div>
    </div>
  );
};

export default CardVencedor;