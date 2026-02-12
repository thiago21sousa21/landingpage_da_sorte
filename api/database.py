import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv() # Carrega as variáveis do .env

# Monta a URL usando as variáveis de ambiente
#SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"

DB_URL = os.getenv("DATABASE_URL")

if not DB_URL:
    print("ALERTA: DATABASE_URL não foi encontrada nas variaveis de ambiente!")
else:
    print(f"DATABASE_URL encontrada (iniciada com: {DB_URL[:10]}...)")

if DB_URL and DB_URL.startswith("postgres://"):
    DB_URL = DB_URL.replace("postgres://", "postgresql://", 1)
else:
    USER = os.getenv("DB_USER")
    PASS = os.getenv("DB_PASSWORD")
    HOST = os.getenv("DB_HOST")
    NAME = os.getenv("DB_NAME")
    DB_URL = f"postgresql://{USER}:{PASS}@{HOST}/{NAME}"

if "postgresql" in DB_URL:
    engine = create_engine(
        DB_URL,
        connect_args={"sslmode":"require"}
    )
else:
    engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependência para abrir/fechar o banco em cada requisição
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
