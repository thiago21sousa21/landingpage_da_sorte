import random
from sqlalchemy.orm import Session
from fastapi import HTTPException
import models

def realizar_sorteio(db: Session):
    # 1. Verificar se já existe um vencedor (Regra de Sorteio Único)
    ja_existe = db.query(models.Sorteio).first()
    # if ja_existe:
    #     raise HTTPException(status_code=400, detail="O sorteio já foi realizado!")

    # 2. Buscar todos os IDs de participantes
    participantes_ids = db.query(models.Participante.id).all()
    
    if not participantes_ids:
        raise HTTPException(status_code=404, detail="Nenhum participante cadastrado para sortear.")

    # 3. Sortear um ID aleatório (Extraindo o valor da tupla retornada pelo SQLAlchemy)
    vencedor_id = random.choice([p[0] for p in participantes_ids])

    # 4. Registrar o vencedor na tabela de Sorteio
    novo_sorteio = models.Sorteio(vencedor_id=vencedor_id)
    db.add(novo_sorteio)
    db.commit()
    db.refresh(novo_sorteio)

    return novo_sorteio