import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # 1. Importe o Middleware
from dotenv import load_dotenv

import models
from database import engine
from routers import public, admin

import security
from database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends


# Adicione este import para rodar o comando SQL puro
from sqlalchemy import text


load_dotenv()


# # --- BLOCO TEMPORÁRIO PARA ATUALIZAR O BANCO ---
# # Isso vai deletar a tabela antiga para o 'create_all' criar a nova com a coluna certa
# with engine.connect() as conn:
#     print("🗑️ Apagando tabela antiga de sorteios...")
#     conn.execute(text("DROP TABLE IF EXISTS sorteios CASCADE"))
#     conn.commit()

# Cria as tabelas no banco de dados
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema de Sorteio Profissional")

cors_origins_raw = os.getenv("CORS_ORIGINS", "")
origins = cors_origins_raw.split(",") if cors_origins_raw else []

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          
    allow_credentials=True,
    allow_methods=["*"],             # Permite todos os métodos (GET, POST, etc)
    allow_headers=["*"],             # Permite todos os cabeçalhos
)

# Inclui as rotas públicas
app.include_router(public.router, tags=["Público"])
app.include_router(admin.router)
