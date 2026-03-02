# 🎫 Landing Page da Sorte - API

Uma solução robusta de sorteios para eventos, com foco em segurança, validação de presença via QR Code e sorteio justo (apenas para participantes presentes).

---

## 🚀 Sobre o Projeto

Este projeto foi desenvolvido para resolver o problema de sorteios manuais em eventos, onde muitas vezes o ganhador não está presente no local. A API gerencia desde o cadastro do participante até a validação de entrada na portaria e o sorteio final.

### Principais Diferenciais:
* **Segurança com UUID:** Em vez de IDs sequenciais, usamos Tokens Únicos (UUID) nos QR Codes para evitar fraudes.
* **Validação de Presença:** Sistema de check-in integrado que marca o participante como "Presente".
* **Sorteio Inteligente:** O algoritmo de sorteio exclui automaticamente quem já ganhou e quem não confirmou presença no evento.
* **Arquitetura Limpa:** Separação clara entre Modelos de Banco (SQLAlchemy) e Schemas de API (Pydantic).

---

## 🛠️ Tecnologias Utilizadas

* **FastAPI:** Framework moderno de alta performance.
* **SQLAlchemy:** ORM para comunicação robusta com o banco de dados.
* **PostgreSQL:** Banco de dados relacional (hospedado no Render).
* **JWT (JSON Web Tokens):** Autenticação segura para a área administrativa.
* **Pydantic:** Validação rigorosa de dados.

---

## 📐 Arquitetura do Sistema

O fluxo do sistema segue o padrão de **Injeção de Dependências** do FastAPI:

1.  **Participante:** Cadastra-se -> Recebe QR Code com `qr_token`.
2.  **Portaria:** Escaneia QR Code -> API valida `X-Admin-Key` -> Marca `presenca_confirmada = True`.
3.  **Sorteio:** Admin sorteia prêmio -> API filtra apenas `presentes` e `não-ganhadores` -> Define vencedor.



---

## 🛣️ Principais Endpoints

### Público
* `POST /participantes`: Cadastro de novos usuários.
* `GET /participante/{cpf}`: Recuperação de comprovante e QR Code por CPF.

### Administrativo (Protegido)
* `POST /admin/login`: Gera token JWT para acesso.
* `GET /admin/participantes`: Lista completa de inscritos.
* `POST /admin/sortear`: Realiza o sorteio aleatório de um prêmio.
* `PATCH /admin/validar-presenca/{token}`: Validação de entrada via QR Code (exige API Key).

---

## 🔧 Como Rodar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
Crie um ambiente virtual e instale as dependências:

Bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
Configure as variáveis de ambiente no arquivo .env:

Code snippet
DATABASE_URL=sua_url_do_postgres
SECRET_KEY=sua_chave_jwt
VALIDATION_KEY=sua_chave_mestra_da_portaria
Inicie o servidor:

Bash
uvicorn main:app --reload