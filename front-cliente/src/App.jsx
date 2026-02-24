import { Routes, Route } from 'react-router-dom';
import Home from './pages/LandingPage/LandingPage';
import CadastroParticipante from './pages/CadastroParticipante/CadastroParticipante';
import ValidacaoAdmin from './pages/ValidacaoAdmin/ValidacaoAdmin';
import ScannerPage from './pages/ValicadaoAdmin/ScannerPage';

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Rota raiz: a primeira coisa que o usuário vê */}
        <Route path="/" element={<Home />} />
        
        {/* Rota de cadastro: para onde o botão vai levar */}
        <Route path="/cadastro" element={<CadastroParticipante />} />
        <Route path='/validar' element={<ScannerPage/>}/>
        <Route path='/validar/:token' element={<ValidacaoAdmin/>}/>
      </Routes>
    </div>
  );
}

export default App;