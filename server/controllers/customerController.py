from uuid import UUID
from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import get_db
from schemas.userSchema import UserSchema
from models.user import User
from models.customer import Customer

class CustomerController:
    def getCustomerByUserId(userId: UUID, db: Session = Depends(get_db)):
        return db.query(Customer).filter(Customer.user_id == userId).first()
          