from pydantic import BaseModel, EmailStr, Field, field_validator
import re
from datetime import datetime
from typing import Optional

# 1. O que o usuário ENVIA (Cadastro)
class ParticipanteCreate(BaseModel):
    nome: str = Field(..., min_length=3, max_length=100)
    # Regex: garante exatamente 11 dígitos numéricos
    cpf: str = Field(..., pattern=r"^\d{11}$")
    email: EmailStr
    endereco: Optional[str] = None

# 2. O que o sistema DEVOLVE (Resposta)
class Participante(ParticipanteCreate):
    id: int
    numero_sorteio: int
    data_cadastro: datetime

    class Config:
        from_attributes = True # Permite que o Pydantic leia dados do SQLAlchemy

# 3. O que o sistema devolve após o sorteio
class SorteioResposta(BaseModel):
    id: int
    vencedor: Participante
    data_sorteio: datetime

    class Config:
        from_attributes = True