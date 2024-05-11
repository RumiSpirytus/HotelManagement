from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from sqlalchemy.orm import Session
from controllers.customerController import CustomerController
from schemas.customerSchema import CustomerUpdateSchema

router = APIRouter(prefix="/customer", tags=["Customer"], responses={404: {"description": "Not found"}})

@router.get('/{customer_id}')
async def getCustomer(customer_id: str, db: Session = Depends(get_db)):
    return CustomerController.getCustomerByUserId(customer_id, db)

@router.put('/{customer_id}')
async def updateCustomerInfo(customer_id: str, user: CustomerUpdateSchema, db: Session = Depends(get_db)):
    return CustomerController.updateCustomerInfo(customer_id, user, db)