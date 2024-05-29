from models.user import User
from schemas.employeeSchema import EmployeeCreateSchema, EmployeeUpdateSchema
from database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
import uuid
from models.employee import Employee
from models.user import User
from utils import get_hashed_password


class EmployeeController:
    def create_employee(user: EmployeeCreateSchema, db: Session = Depends(get_db)):
        
        #check if email already exists
        db_user = db.query(User).filter(User.email == user.email).first()
        if db_user:
            return JSONResponse(status_code=400, content={"message":"Email already exists"})
        
        
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

        db_employee = Employee(
            id=uuid.uuid4(),
            user_id=db_user.id,
            first_name=user.first_name,
            last_name=user.last_name,
            phone_num=user.phone_num,
            hotel_id=user.hotel_id,
            manager_id=user.manager_id,
            created_at=user.created_at,
            updated_at=user.updated_at
        )
        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)

        return JSONResponse(status_code=201, content={"message":"Employee created successfully", "employee_id": str(db_employee.id)})
    
    def get_employee_by_hotel_id(hotel_id: str, db: Session = Depends(get_db)):
        employees = db.query(Employee.id, User.email, Employee.phone_num, Employee.first_name, Employee.last_name).join(User, User.id == Employee.user_id).filter(Employee.hotel_id == hotel_id).all()
        if not employees:
            return JSONResponse(status_code=404, content={"message":"No employees found"})
        return [{"id": employee[0], "email": employee[1], "phone_num": employee[2], "first_name": employee[3], "last_name": employee[4]} for employee in employees]
    
    def get_employee_by_id(employee_id: str, db: Session = Depends(get_db)):
        employee = db.query(Employee.id, User.email, Employee.phone_num, Employee.first_name, Employee.last_name, Employee.hotel_id).join(User, User.id == Employee.user_id).filter(Employee.id == employee_id).first()
        if not employee:
            return JSONResponse(status_code=404, content={"message":"Employee not found"})
        return {"id": employee[0], "email": employee[1], "phone_num": employee[2], "first_name": employee[3], "last_name": employee[4], "hotel_id": employee[5]}
    
    def update_employee(employee_id: str, user: EmployeeUpdateSchema, db: Session = Depends(get_db)):
        db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
        if not db_employee:
            return JSONResponse(status_code=404, content={"message":"Employee not found"})
        
        db_user = db.query(User).filter(User.id == db_employee.user_id).first()
        if not db_user:
            return JSONResponse(status_code=404, content={"message":"User not found"})
        
        if user.password:
            db_user.password = get_hashed_password(user.password)
        db_user.updated_at = user.updated_at
        db.commit()
        
        if user.first_name:
            db_employee.first_name = user.first_name
        if user.last_name:
            db_employee.last_name = user.last_name
        if user.phone_num:
            db_employee.phone_num = user.phone_num
        db_employee.updated_at = user.updated_at
        
        db.commit()
        return JSONResponse(status_code=200, content={"message":"Employee updated successfully"})
    
    def delete_employee(employee_id: str, db: Session = Depends(get_db)):
        db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
        if not db_employee:
            return JSONResponse(status_code=404, content={"message":"Employee not found"})
        
        db_user = db.query(User).filter(User.id == db_employee.user_id).first()
        if not db_user:
            return JSONResponse(status_code=404, content={"message":"User not found"})
        
        db.delete(db_user)
        db.commit()
        return JSONResponse(status_code=200, content={"message":"Employee deleted successfully"})
    
    def getCountEmployeesByManagerId(manager_id: str, db: Session = Depends(get_db)):
        employees = db.query(Employee).filter(Employee.manager_id == manager_id).all()
        return len(employees)