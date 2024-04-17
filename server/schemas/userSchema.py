from pydantic import BaseModel
import enum
from datetime import datetime

class Role(str, enum.Enum):
    MANAGER = 'manager'
    EMPLOYEE = 'employee'
    CUSTOMER = 'customer'

class UserSchema(BaseModel):
    email: str
    password: str
    role: Role = Role.CUSTOMER
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True