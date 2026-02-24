import { jsPDF } from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import './Comprovante.css';

const Comprovante = ({ dados }) => {
  const urlValidacao = `http://localhost:5173/validar/${dados.qr_token}`;

  const gerarPDF = () => {
    const doc = new jsPDF();
    
    // 1. Configuração do Título
    doc.setFontSize(22);
    doc.setTextColor(92, 58, 33); // Cor Marrom (--color-brown)
    doc.text("VAQUEJADA REAL DE OURO", 105, 20, { align: "center" });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Comprovante de Inscrição", 105, 30, { align: "center" });

    // 2. Dados do Participante
    doc.setFontSize(12);
    doc.text(`Participante: ${dados.nome}`, 20, 50);
    doc.text(`Número da Sorte: ${dados.numero_sorteio}`, 20, 60);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 70);
    doc.text(`Token: ${dados.qr_token.substring(0, 18)}...`, 20, 80);

    // 3. CAPTURANDO O QR CODE
    // Pegamos o elemento SVG gerado pelo QRCodeSVG
    const svgElement = document.getElementById("qr-code-download");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    
    // Criamos um Canvas para transformar o SVG em imagem
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    // Transformamos o SVG em um formato que o Canvas entenda (base64)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");

      // 4. Inserindo a Imagem no PDF (x, y, largura, altura)
      doc.addImage(pngUrl, "PNG", 75, 100, 60, 60);
      
      doc.setFontSize(10);
      doc.text("Apresente este QR Code na portaria do evento.", 105, 170, { align: "center" });

      // 5. Finalizando o Download
      doc.save(`inscricao_${dados.numero_sorteio}.pdf`);
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };

  return (
    <div className="comprovante-container section">
      <div className="container">
        <div className="comprovante-card">
          <h3 className="comprovante-title">🎉 Inscrição Confirmada!</h3>
          <p className="comprovante-info">Vaqueiro: <strong>{dados.nome}</strong></p>
          <p className="comprovante-number">Seu número: <span>{dados.numero_sorteio}</span></p>
          
          <div className="qrcode-wrapper">
            {/* Adicionamos o ID aqui para o JS encontrar o QR Code */}
            <QRCodeSVG 
              id="qr-code-download"
              value={urlValidacao} 
              size={180}
              bgColor={"#F5F1E8"} 
              fgColor={"#5C3A21"} 
              level={"H"} 
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