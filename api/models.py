from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship  # Importação necessária para o join
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

    # Relacionamento opcional: permite ver todos os prêmios que este participante ganhou
    premios_ganhos = relationship("Sorteio", back_populates="vencedor")

class Sorteio(Base):
    __tablename__ = "sorteios"

    id = Column(Integer, primary_key=True, index=True)
    item_sorteado = Column(String)
    vencedor_id = Column(Integer, ForeignKey("participantes.id"), nullable=False)
    data_sorteio = Column(DateTime(timezone=True), server_default=func.now()) 
    
    # ESTA LINHA É A CHAVE: Liga o sorteio ao objeto Participante
    vencedor = relationship("Participante", back_populates="premios_ganhos")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)