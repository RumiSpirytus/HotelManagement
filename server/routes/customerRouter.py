from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from sqlalchemy.orm import Session
from controllers.customerController import CustomerController
from schemas.customerSchema import CustomerSchema
import uuid

router = APIRouter(prefix="/customer", tags=["Customer"], responses={404: {"description": "Not found"}})

@router.get('/{user_id}')
def getCustomer(userId: str, db: Session = Depends(get_db)):
    return CustomerController.getCustomerByUserId(userId, db)