from fastapi import Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.userSchema import UserSchema
import uuid
from models.user import User
import bcrypt

class UserController:
    def create_user(user: UserSchema, db: Session = Depends(get_db)):
        hashedPw = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        db_user = User(
            id=uuid.uuid4(),
            email=user.email,
            password=hashedPw,
            created_at=user.created_at,
            updated_at=user.updated_at,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    def get_user_by_email(email: str, db: Session = Depends(get_db)):
        return db.query(User).filter(User.email == email).first()
    
    def get_user_by_id(id: uuid.UUID, db: Session = Depends(get_db)):
        return db.query(User).filter(User.id == id).first()
    


        