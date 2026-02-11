from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas
from fastapi import HTTPException

def criar_participante(db: Session, participante: schemas.ParticipanteCreate):
    # 1. Verificar se CPF ou Email já existem
    db_user = db.query(models.Participante).filter(
        (models.Participante.cpf == participante.cpf) | 
        (models.Participante.email == participante.email)
    ).first()
    
    if db_user:
        raise HTTPException(status_code=400, detail="CPF ou Email já cadastrados.")

    # 2. Gerar o número do sorteio sequencial
    maior_numero = db.query(func.max(models.Participante.numero_sorteio)).scalar()
    novo_numero = (maior_numero + 1) if maior_numero else 1000

    # 3. Criar a instância do modelo
    db_participante = models.Participante(
        **participante.model_dump(),
        numero_sorteio=novo_numero
    )

    # 4. Salvar no banco
    db.add(db_participante)
    db.commit()
    db.refresh(db_participante)
    print(db_participante.__dict__)
    return db_participante