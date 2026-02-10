from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import schemas
from services import participant
import models
from typing import Optional

router = APIRouter()

@router.post("/participar", response_model=schemas.Participante)
def registrar_participante(
    dados: schemas.ParticipanteCreate, 
    db: Session = Depends(get_db)
):
    # Chamamos o "cérebro" (serviço) para processar o cadastro
    return participant.criar_participante(db=db, participante=dados)


@router.get("/vencedor", response_model=Optional[schemas.SorteioResposta])
def consultar_vencedor(db: Session = Depends(get_db)):
    resultado = db.query(models.Sorteio).first()
    if not resultado:
        return None # Sorteio ainda não realizado
        
    vencedor = db.query(models.Participante).filter(models.Participante.id == resultado.vencedor_id).first()
    
    return {
        "id": resultado.id,
        "vencedor": vencedor,
        "data_sorteio": resultado.data_sorteio
    }