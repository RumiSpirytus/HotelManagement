from fastapi import APIRouter, Depends, HTTPException
from controllers.userController import UserController
from schemas.userSchema import UserSchema
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
import re
import uuid

router = APIRouter(prefix="/user", tags=["User"], responses={404: {"description": "Not found"}})

@router.post("/")
async def create_new_user(user: UserSchema, db: Session = Depends(get_db)):
    #check if user already exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user is not None:
        raise HTTPException(status_code=400, detail="User already exists")
    
    #check email is valid
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    if not user.email:
        raise HTTPException(status_code=400, detail="Email is required")
    elif re.fullmatch(regex, user.email) is None:
        raise HTTPException(status_code=400, detail="Invalid email")
    
    return UserController.create_user(user, db)

@router.get("/{email}")
async def get_user_by_email(email: str, db: Session = Depends(get_db)):
    user = UserController.get_user_by_email(email, db)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/{id}")
async def get_user_by_id(id: uuid.UUID, db: Session = Depends(get_db)):
    user = UserController.get_user_by_id(id, db)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user