from fastapi import FastAPI
import models
from database import engine
from routers import public, admin
from fastapi.middleware.cors import CORSMiddleware # 1. Importe o Middleware

# Cria as tabelas no banco de dados
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema de Sorteio Profissional")
origins = [
    "http://localhost:5173", # Endereço do seu Vite/React/Vue
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # Permite seu frontend
    allow_credentials=True,
    allow_methods=["*"],             # Permite todos os métodos (GET, POST, etc)
    allow_headers=["*"],             # Permite todos os cabeçalhos
)

# Inclui as rotas públicas
app.include_router(public.router, tags=["Público"])
app.include_router(admin.router)