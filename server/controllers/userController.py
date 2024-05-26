from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import get_db
from schemas.userSchema import UserSchema, UserLoginSchema
import uuid
from models.user import User
from models.customer import Customer
from models.employee import Employee
from models.manager import Manager
from utils import (
    get_hashed_password,
    create_access_token,
    create_refresh_token,
    verify_password
)

class UserController:
    def create_user(user: UserSchema, db: Session = Depends(get_db)):
        db_user = User(
            id=uuid.uuid4(),
            email=user.email,
            password=get_hashed_password(user.password),
            role=user.role,
            created_at=user.created_at,
            updated_at=user.updated_at,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        if user.role == "customer":
            db_customer = Customer(
                id=uuid.uuid4(),
                user_id=db_user.id,
                created_at=user.created_at,
                updated_at=user.updated_at
            )
            db.add(db_customer)
            db.commit()
            db.refresh(db_customer)

        elif user.role == "employee":
            db_employee = Employee(
                id=uuid.uuid4(),
                user_id=db_user.id,
                created_at=user.created_at,
                updated_at=user.updated_at
            )
            db.add(db_employee)
            db.commit()
            db.refresh(db_employee)

        elif user.role == "manager":
            db_manager = Manager(
                id=uuid.uuid4(),
                user_id=db_user.id,
                created_at=user.created_at,
                updated_at=user.updated_at
            )
            db.add(db_manager)
            db.commit()
            db.refresh(db_manager)

        return JSONResponse(status_code=201, content={"message":"User created successfully", "user_id": str(db_user.id)})
    
    def get_user_by_email(email: str, db: Session = Depends(get_db)):
        return db.query(User).filter(User.email == email).first()
    
    def get_user_by_id(id: uuid.UUID, db: Session = Depends(get_db)):
        return db.query(User).filter(User.id == id).first()
    
    def login(user: UserLoginSchema, db: Session = Depends(get_db)):
        db_user = db.query(User).filter(User.email == user.email).first()
        if db_user is None:
            raise HTTPException(status_code=400, detail="Incorrect email")

        hashed_password = db_user.password
        if not verify_password(user.password, hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect password")
        
        #find customer, employee or manager
        if db_user.role == "customer":
            db_customer = db.query(Customer).filter(Customer.user_id == db_user.id).first()
            user_role = "customer"
            role_id = db_customer.id
        elif db_user.role == "employee":
            db_employee = db.query(Employee).filter(Employee.user_id == db_user.id).first()
            user_role = "employee"
            role_id = db_employee.id
        elif db_user.role == "manager":
            db_manager = db.query(Manager).filter(Manager.user_id == db_user.id).first()
            user_role = "manager"
            role_id = db_manager.id

        return {
            "access_token": create_access_token(db_user.email),
            "refresh_token": create_refresh_token(db_user.email),
            "user_id": str(db_user.id),
            "role": user_role,
            "role_id": str(role_id)
        }


        