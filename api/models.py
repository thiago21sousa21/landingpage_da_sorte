from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Participante(Base):
    __tablename__ = "participantes"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    cpf = Column(String(11), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    endereco = Column(String(255))
    numero_sorteio = Column(Integer, unique=True, index=True)
    data_cadastro = Column(DateTime(timezone=True), server_default=func.now())

class Sorteio(Base):
    __tablename__ = "sorteios"

    id = Column(Integer, primary_key=True, index=True)
    vencedor_id = Column(Integer, ForeignKey("participantes.id"), nullable=False)
    data_sorteio = Column(DateTime(timezone=True), server_default=func.now())   

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)