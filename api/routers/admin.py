from fastapi import APIRouter, Depends, HTTPException, status, Header
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
import security, schemas, models
from sqlalchemy.orm import Session
from database import get_db
from services import raffle
from typing import List, Optional
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter(prefix="/admin", tags=["Administração"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="admin/login")

# Função de Dependência para proteger as rotas
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return username

# Rota para o Admin logar e receber o Token
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Usuário ou senha incorretos")
    
    access_token = security.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Agora, protegemos a listagem e o sorteio adicionando a dependência!
@router.get("/participantes", response_model=list[schemas.Participante])
def listar_participantes(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return db.query(models.Participante).all()

# routers/admin.py

@router.post("/sortear", response_model=schemas.SorteioResposta)
def sortear_ganhador(
    dados: schemas.SorteioCreate, # Recebe o nome do prêmio do Front
    db: Session = Depends(get_db), 
    current_user: str = Depends(get_current_user)
):
    # Passamos o db e o nome do prêmio (item_sorteado) para o service
    resultado = raffle.realizar_sorteio(db, dados.item_sorteado)
    
    # Buscamos o objeto completo do vencedor para a resposta
    vencedor = db.query(models.Participante).filter(models.Participante.id == resultado.vencedor_id).first()
    
    return {
        "id": resultado.id,
        "item_sorteado": resultado.item_sorteado, # Adicionado na resposta
        "vencedor": vencedor,
        "data_sorteio": resultado.data_sorteio
    }


@router.get("/todos-sorteios", response_model=List[schemas.SorteioResposta])
def listar_todos_sorteios(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    # 1. Usamos joinedload para buscar o sorteio e o participante em uma única consulta
    # Isso evita erros de conexão e é muito mais rápido
    sorteios = db.query(models.Sorteio)\
        .options(joinedload(models.Sorteio.vencedor))\
        .order_by(desc(models.Sorteio.id))\
        .all()
    
    # 2. Como usamos joinedload, o SQLAlchemy já associa o objeto 'vencedor' automaticamente
    # O FastAPI/Pydantic vai converter isso para o schema SorteioResposta sozinho
    return sorteios

@router.patch("/validar-presenca/{token}", response_model=schemas.Participante)
def confirmar_presenca(token:str, db: Session = Depends(get_db), x_admin_key:str = Header(None)):
    CHAVE_MESTRA = os.getenv("VALIDATION_KEY")

    if x_admin_key != CHAVE_MESTRA:
        raise HTTPException(status_code=403, detail="Acesso negado: Chave de validação inválida ou ausente")
    
    #1. Busca pelo token único
    participante = db.query(models.Participante).filter(models.Participante.qr_token == token).first()

    if not participante:
        raise HTTPException(status_code=404, detail="QR Code inválido.")
    
    if participante.presenca_confirmada:
        raise HTTPException(status_code=400, detail="Este Qr Code já foi utilizado")
    
    #2. marca da presença
    participante.presenca_confirmada = True

    db.commit()
    db.refresh(participante)
    return participante