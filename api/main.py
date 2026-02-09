from fastapi import FastAPI
import models
from database import engine
from routers import public

# Cria as tabelas no banco de dados
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema de Sorteio Profissional")

# Inclui as rotas públicas
app.include_router(public.router, tags=["Público"])