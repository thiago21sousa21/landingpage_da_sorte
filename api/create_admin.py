from database import SessionLocal
import models
import security

def create_initial_admin():
    # 1. Abre uma sessão com o banco de dados
    db = SessionLocal()
    
    try:
        # 2. Define os dados do seu admin
        username = "admin"
        password_plana = "senha_super_forte_123" # ALTERE ESTA SENHA ANTES DE RODAR!
        
        # 3. Verifica se o usuário já existe para não dar erro
        user_exists = db.query(models.User).filter(models.User.username == username).first()
        
        if not user_exists:
            print(f"Criando usuário '{username}'...")
            
            # 4. Transforma a senha em Hash seguro
            hashed_pw = security.get_password_hash(password_plana)
            
            # 5. Cria o objeto do modelo
            new_admin = models.User(
                username=username,
                hashed_password=hashed_pw
            )
            
            # 6. Salva no banco de dados
            db.add(new_admin)
            db.commit()
            print("✅ Administrador criado com sucesso!")
            print(f"Usuário: {username}")
            print(f"Senha: {password_plana}")
        else:
            print(f"⚠️ O usuário '{username}' já existe no banco de dados.")

    except Exception as e:
        print(f"❌ Erro ao criar admin: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_initial_admin()