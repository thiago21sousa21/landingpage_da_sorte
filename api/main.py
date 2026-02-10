import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # 1. Importe o Middleware
from dotenv import load_dotenv

import models
from database import engine
from routers import public, admin

load_dotenv()

# Cria as tabelas no banco de dados
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema de Sorteio Profissional")

cors_origins_raw = os.getenv("CORS_ORIGINS", "")
origins = cors_origins_raw.split(",") if cors_origins_raw else []

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