📌 Sobre o Projeto
Este é o ecossistema de interface da Vaquejada Real de Ouro 2026. Desenvolvido com React + Vite, o projeto atende a dois públicos distintos em uma única Single Page Application (SPA):

Vaqueiros (Público): Landing Page imersiva, formulário de inscrição e recuperação de comprovante PDF via CPF.

Staff (Admin): Scanner de QR Code integrado e tela de validação de presença com autenticação por chave de segurança (X-Admin-Key).

🛠️ Tecnologias Utilizadas
Framework: React 18

Build Tool: Vite (Ultra rápido)

Roteamento: React Router Dom v6

Scanner QR: Html5-Qrcode

PDF: @react-pdf/renderer

Estilização: CSS3 Puro (Design System Customizado)

Deploy: Netlify (com suporte a SPA via _redirects)

📂 Estrutura de Pastas Principal
Plaintext
src/
 ├── assets/          # Imagens e ícones (Logos, Backgrounds)
 ├── components/      # Componentes globais (Comprovante, Modais)
 ├── pages/           # Páginas da aplicação
 │    ├── LandingPage # Seções da Home (Hero, About, etc.)
 │    ├── Cadastro    # Formulário de inscrição
 │    └── Validacao   # Scanner e Admin Config
 ├── services/        # Integração com API (Axios/Fetch)
 └── index.css        # Design System (Variáveis e Cores)
🚀 Como Rodar Localmente
Clone o repositório:

Bash
git clone https://github.com/seu-usuario/vaquejada-front.git
Instale as dependências:

Bash
npm install
Configure as Variáveis de Ambiente:
Crie um arquivo .env na raiz do projeto:

Code snippet
VITE_API_URL=http://localhost:8000
Inicie o servidor de desenvolvimento:

Bash
npm run dev
🌐 Deploy (Netlify)
O projeto está configurado para o Netlify. Devido ao uso do React Router, incluímos o arquivo public/_redirects com a seguinte instrução para evitar erros 404 ao atualizar a página:

Plaintext
/* /index.html   200
Variáveis de Produção:
No painel do Netlify, configure:

VITE_API_URL: URL da sua API no Render.

🔐 Segurança de Validação (Admin)
Para acessar o scanner de presença:

Acesse a rota /admin-config.

Insira a Chave de Segurança (definida no .env do Backend).

A chave será salva no localStorage e enviada automaticamente no Header X-Admin-Key em todas as validações.