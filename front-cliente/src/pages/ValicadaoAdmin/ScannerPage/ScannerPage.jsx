import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './ScannerPage.css';

const ScannerPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        // O decodedText será a URL completa: http://localhost:5173/validar/UUID
        // Precisamos extrair apenas o token ou redirecionar
        if (decodedText.includes('/validar/')) {
          const token = decodedText.split('/validar/')[1];
          scanner.clear(); // Desliga a câmera
          navigate(`/validar/${token}`); // Vai para a página de sucesso/erro
        }
      },
      (error) => {
        // Erros de leitura ignoramos para não poluir o console
      }
    );

    return () => scanner.clear(); // Limpa ao fechar a página
  }, [navigate]);

  return (
    <div className="section scanner-container">
      <div className="container">
        <h2 className="section-title">Validar Entrada</h2>
        <p>Aponte a câmera para o QR Code do comprovante</p>
        
        <div id="reader" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}></div>
        
        <button className="btn" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default ScannerPage;