from fastapi import APIRouter
from schemas.employeeSchema import EmployeeCreateSchema, EmployeeUpdateSchema
from database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
from controllers.employeeController import EmployeeController

router = APIRouter(prefix='/employee', tags=["Employee"])

@router.post('')
def create_employee(user: EmployeeCreateSchema, db: Session = Depends(get_db)):
    return EmployeeController.create_employee(user, db)

@router.get('/{hotel_id}')
def get_employee_by_hotel_id(hotel_id: str, db: Session = Depends(get_db)):
    return EmployeeController.get_employee_by_hotel_id(hotel_id, db)

@router.get('/employee_id/{employee_id}')
def get_employee_by_id(employee_id: str, db: Session = Depends(get_db)):
    return EmployeeController.get_employee_by_id(employee_id, db)

@router.put('/{employee_id}')
def update_employee(employee_id: str, user: EmployeeUpdateSchema, db: Session = Depends(get_db)):
    return EmployeeController.update_employee(employee_id, user, db)

@router.delete('/{employee_id}')
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    return EmployeeController.delete_employee(employee_id, db)

@router.get('/count/manager/{manager_id}')
def get_employee_count_by_manager_id(manager_id: str, db: Session = Depends(get_db)):
    return EmployeeController.getCountEmployeesByManagerId(manager_id, db)
