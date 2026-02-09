import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import CadastroParticipante from './pages/CadastroParticipante/CadastroParticipante';

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Rota raiz: a primeira coisa que o usuário vê */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rota de cadastro: para onde o botão vai levar */}
        <Route path="/cadastro" element={<CadastroParticipante />} />
      </Routes>
    </div>
  );
}

export default App;