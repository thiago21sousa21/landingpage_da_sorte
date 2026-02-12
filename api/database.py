import os
import re
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Pegar a URL e limpar qualquer lixo (espaços ou quebras de linha)
raw_url = os.getenv("DATABASE_URL", "")
DB_URL = raw_url.strip()

if DB_URL:
    # O Render manda postgres://, mas precisamos de postgresql://
    # Usamos Regex para garantir que só mude o início da frase
    DB_URL = re.sub(r'^postgres://', 'postgresql://', DB_URL)
    print(f"🚀 Conectando ao Banco... (Protocolo: {DB_URL.split(':')[0]})")
else:
    # Fallback Local
    USER = os.getenv("DB_USER", "postgres")
    PASS = os.getenv("DB_PASSWORD", "admin")
    HOST = os.getenv("DB_HOST", "localhost")
    NAME = os.getenv("DB_NAME", "sistema_sorteio")
    DB_URL = f"postgresql://{USER}:{PASS}@{HOST}/{NAME}"

# 2. Criação do Engine com parâmetros de segurança para o Render
# Adicionamos pool_pre_ping para evitar conexões "zumbis"
engine = create_engine(
    DB_URL,
    connect_args={"sslmode": "require"} if "postgresql" in DB_URL else {},
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()