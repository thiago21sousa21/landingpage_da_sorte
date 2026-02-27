import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './ScannerPage.css';

const ScannerPage = () => {
  const navigate = useNavigate();
  const [hasKey, setHasKey] = useState(!!localStorage.getItem('admin_key'));

  // Adicione esta função dentro do componente ScannerPage
  const handleLogout = () => {
    if (window.confirm("Deseja remover a chave de segurança e sair?")) {
      localStorage.removeItem('admin_key');
      setHasKey(false);
      navigate('/admin-config');
    }
  };

  useEffect(() => {
    if (!hasKey) return;

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
  }, [navigate, hasKey]);

  if (!hasKey) {
    return (
      <div className="section container scanner-lock">
        <div className="status-card">
          <div className="status-icon">🔒</div>
          <h2 className="status-title">Scanner Bloqueado</h2>
          <p>Você precisa configurar a chave de acesso antes de iniciar a validação.</p>
          <button className="btn btn-primary" onClick={() => navigate('/admin-config')}>
            Configurar Chave
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="section scanner-container">
      <div className="container">
        <header className="scanner-header">
           <h2 className="section-title">Validar Entrada</h2>
           <button className="btn-config-icon" onClick={() => navigate('/admin-config')} title="Configurações">
             ⚙️
           </button>
           <button className="btn-logout-icon" onClick={handleLogout} title="Sair/Limpar Chave">
            Logout 🔓
          </button>
        </header>
        <p className="scanner-instruction">Aponte a câmera para o QR Code do comprovante</p>
        
        <div id="reader" className="scanner-reader-viewport"></div>
        
        <button className="btn-back" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
          Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default ScannerPage;