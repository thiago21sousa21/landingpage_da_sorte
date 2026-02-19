import random
from sqlalchemy.orm import Session
from fastapi import HTTPException
import models

def realizar_sorteio(db: Session, descricao_item: str):
    # 1. Pegar IDs de quem JÁ GANHOU
    # O .all() aqui retorna uma lista de tuplas de um único elemento: [(1,), (5,), (12,)]
    # Usamos uma list comprehension para extrair o número de dentro da tupla
    vencedores_res = db.query(models.Sorteio.vencedor_id).all()
    vencedores_lista = [r[0] for r in vencedores_res]
    
    # 2. Buscar participantes que NÃO estão na lista de vencedores
    # Adicionamos a lógica para excluir quem já ganhou
    candidatos = db.query(models.Participante).filter(
        ~models.Participante.id.in_(vencedores_lista)
    ).all()

    if not candidatos:
        from fastapi import HTTPException
        raise HTTPException(
            status_code=400, 
            detail="Não há participantes disponíveis que ainda não ganharam prêmios."
        )

    # 3. Escolher um vencedor aleatório entre os candidatos restantes
    import random
    ganhador = random.choice(candidatos)

    # 4. Registrar o novo sorteio com o item sorteado
    novo_sorteio = models.Sorteio(
        item_sorteado=descricao_item, 
        vencedor_id=ganhador.id
    )
    db.add(novo_sorteio)
    db.commit()
    db.refresh(novo_sorteio)
    
    return novo_sorteio