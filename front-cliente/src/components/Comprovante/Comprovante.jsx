import { jsPDF } from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import './Comprovante.css';

const Comprovante = ({ dados }) => {
  // A URL que o administrador vai ler para validar a entrada
  // Substitua 'sua-url-do-evento.com' pela URL real quando fizer o deploy
  const urlValidacao = `http://localhost:5173/validar/${dados.qr_token}`;

  const gerarPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text("Comprovante de Inscrição", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Participante: ${dados.nome}`, 20, 40);
    doc.text(`Número da Sorte: ${dados.numero_sorteio}`, 20, 50);
    doc.text(`Token de Segurança: ${dados.qr_token}...`, 20, 60);
    
    // Podemos adicionar uma instrução no PDF
    doc.text("Apresente o QR Code na entrada para validar sua presença.", 20, 80);
    
    doc.save(`inscricao_${dados.numero_sorteio}.pdf`);
  };

  return (
    <div className="comprovante-container section">
      <div className="container">
        <div className="comprovante-card">
          <h3 className="comprovante-title">🎉 Inscrição Confirmada!</h3>
          <p className="comprovante-info">Vaqueiro: <strong>{dados.nome}</strong></p>
          <p className="comprovante-number">Seu número: <span>{dados.numero_sorteio}</span></p>
          
          <div className="qrcode-wrapper">
            <QRCodeSVG 
              value={urlValidacao} 
              size={180}
              bgColor={"#F5F1E8"} // --color-light
              fgColor={"#5C3A21"} // --color-brown
              level={"H"} // Alta tolerância a erros (útil para ler sob o sol)
            />
            <p className="qrcode-instruction">Aponte a câmera na portaria</p>
          </div>

          <button className="btn btn-primary" onClick={gerarPDF}>
            Baixar Comprovante PDF 📄
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comprovante;