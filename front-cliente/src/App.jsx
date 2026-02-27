import { Routes, Route } from 'react-router-dom';
import Home from './pages/LandingPage/LandingPage';
import CadastroParticipante from './pages/CadastroParticipante/CadastroParticipante';
import ValidacaoAdmin from './pages/ValicadaoAdmin/ValidacaoAdmin';
import ScannerPage from './pages/ValicadaoAdmin/ScannerPage/ScannerPage';
import ConfigAdmin from './pages/ValicadaoAdmin/ConfigAdmin/ConfigAdmin';


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
        <Route path='/admin-config' element={<ConfigAdmin/>}/>

      </Routes>
    </div>
  );
}

export default App;