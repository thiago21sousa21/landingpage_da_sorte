import { jsPDF } from "jspdf";
import { QRCodeSVG } from "qrcode.react";

const Comprovante = ({ dados }) => {
  const gerarPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text("Comprovante de Inscrição", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Nome: ${dados.nome}`, 20, 40);
    doc.text(`CPF: ${dados.cpf}`, 20, 50);
    doc.text(`E-mail: ${dados.email}`, 20, 60);
    doc.text(`Número da Sorte: ${dados.numero_sorteio}`, 20, 70);
    doc.text(`Data: ${new Date(dados.data_cadastro).toLocaleString()}`, 20, 80);
    
    doc.save(`comprovante_${dados.numero_sorteio}.pdf`);
  };

  return (
    <div className="comprovante-box">
      <h3>🎉 Inscrição Confirmada!</h3>
      <p>Seu número é: <strong>{dados.numero_sorteio}</strong></p>
      
      <div style={{ margin: '20px 0' }}>
        <QRCodeSVG 
          value={`Nome: ${dados.nome} | Número: ${dados.numero_sorteio}`} 
          size={128}
        />
        <p><small>Aponte a câmera para validar</small></p>
      </div>

      <button onClick={gerarPDF}>Baixar Comprovante PDF 📄</button>
    </div>
  );
};

export default Comprovante;