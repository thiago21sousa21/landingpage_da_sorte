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


load_dotenv()

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
@app.get("/setup-inicial-admin")
def setup_inicial(db: Session = Depends(get_db)):
    user_exists = db.query(models.User).first()
    
    if not user_exists:
        # Pega a senha da variável de ambiente. 
        # Se não existir no Render, usa uma senha padrão de fallback (segurança extra)
        raw_password = os.getenv("SECRET_KEY")
        
        hashed_pw = security.get_password_hash(raw_password) 
        new_admin = models.User(username="admin", hashed_password=hashed_pw)
        
        db.add(new_admin)
        db.commit()
        return {"message": "Admin criado com sucesso! Use a senha configurada no Render."}
    
    return {"message": "Usuário já existe no sistema."}
# Inclui as rotas públicas
app.include_router(public.router, tags=["Público"])
app.include_router(admin.router)
