from uuid import UUID
from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import get_db
from schemas.customerSchema import CustomerSchema
from models.user import User
from models.customer import Customer
from datetime import datetime

class CustomerController:
    def getCustomerByUserId(customer_id: UUID, db: Session = Depends(get_db)):
        return db.query(Customer).filter(Customer.id == customer_id).first()
    
    def updateCustomerInfo(customer_id: UUID, customer: CustomerSchema, db: Session = Depends(get_db)):
        db_customer = db.query(Customer).filter(Customer.id == customer_id).first()
        if db_customer is None:
            raise HTTPException(status_code=404, detail="Customer not found")
        
        db_customer.first_name = customer.first_name
        db_customer.last_name = customer.last_name
        db_customer.phone_num = customer.phone_num
        db_customer.bank_num = customer.bank_num
        db_customer.bank_name = customer.bank_name
        db_customer.updated_at = datetime.now()
        db.commit()
        db.refresh(db_customer)
        return db_customer