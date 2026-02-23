from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

# --- SCHEMAS DE PARTICIPANTE ---

class ParticipanteCreate(BaseModel):
    nome: str = Field(..., min_length=3, max_length=100)
    cpf: str = Field(..., pattern=r"^\d{11}$")
    email: EmailStr
    endereco: Optional[str] = None

class Participante(ParticipanteCreate):
    id: int
    numero_sorteio: int
    data_cadastro: datetime

    # ADICIONADOS:
    qr_token: str # O token UUID que o Front vai usar para gerar o QR Code
    presenca_confirmada: bool # Para o Front mostrar se ele já entrou ou não

    class Config:
        from_attributes = True


# --- SCHEMAS DE SORTEIO (Ajustados para Multi-Prêmios) ---

# O que o Front envia para o POST /admin/sortear
class SorteioCreate(BaseModel):
    item_sorteado: str = Field(..., min_length=1, description="Nome do prêmio sendo sorteado")

# O que a API devolve ao realizar ou consultar sorteios
class SorteioResposta(BaseModel):
    id: int
    item_sorteado: str
    vencedor: Participante
    data_sorteio: datetime

    class Config:
        from_attributes = True


# --- SCHEMAS DE AUTENTICAÇÃO (Para o Admin) ---

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str