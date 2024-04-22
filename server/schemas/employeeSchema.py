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

class EmployeeUpdateSchema(BaseModel):
    user_id: Optional[str]
    hotel_id: Optional[str]
    manager_id: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    phone_num: Optional[str]
    created_at: Optional[datetime]
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True