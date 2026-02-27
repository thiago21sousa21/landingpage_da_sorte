import {useState} from "react"
import {useNavigate} from "react-router-dom"

const ConfigAdmin = () =>{
    const [chave, setChave] = useState(localStorage.getItem('admin-key') || '');
    const navigate = useNavigate()

    const handleSave = (e) =>{
        e.preventDefault();
        localStorage.setItem('admin_key', chave);
        alert('Chave de segurança salva com sucesso!');
        navigate('/validar');
    }

    return(
        <div className="section container">
            <h2 className="section-title">Configuração do Staff</h2>
            <form onSubmit={handleSave} className="cadastro-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="form-group">
                    <label>Chave de Segurança (X-Admin-Key)</label>
                    <input 
                        type="password" 
                        value={chave}
                        onChange={(e)=>setChave(e.target.value)}
                        placeholder="Digite a chave de validar presença"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary"> Salvar e Ir para o Scanner</button>
            </form>
        </div>
    );
}

export default ConfigAdmin