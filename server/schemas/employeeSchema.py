from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EmployeeSchema(BaseModel):
    user_id: str
    hotel_id: str
    manager_id: str
    first_name: str
    last_name: str
    phone_num: str
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True
        
class EmployeeCreateSchema(BaseModel):
    manager_id: str
    hotel_id: str
    email: str
    password: str
    role: str = "EMPLOYEE"
    first_name: str
    last_name: str
    phone_num: str
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True
        
class EmployeeUpdateSchema(BaseModel):
    password: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_num: Optional[str] = None
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True