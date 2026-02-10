from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
import security, schemas, models
from sqlalchemy.orm import Session
from database import get_db
from services import raffle
from typing import List

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

# Rota para realizar o sorteio
@router.post("/sortear", response_model=schemas.SorteioResposta)
def sortear_ganhador(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    # Chamamos o serviço que criamos acima
    resultado = raffle.realizar_sorteio(db)
    
    # Buscamos o objeto completo do vencedor para a resposta do Schema
    vencedor = db.query(models.Participante).filter(models.Participante.id == resultado.vencedor_id).first()
    
    return {
        "id": resultado.id,
        "vencedor": vencedor,
        "data_sorteio": resultado.data_sorteio
    }