from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import schemas
from services import participant

router = APIRouter()

@router.post("/participar", response_model=schemas.Participante)
def registrar_participante(
    dados: schemas.ParticipanteCreate, 
    db: Session = Depends(get_db)
):
    # Chamamos o "cérebro" (serviço) para processar o cadastro
    return participant.criar_participante(db=db, participante=dados)