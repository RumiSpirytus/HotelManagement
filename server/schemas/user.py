from pydantic import BaseModel
from enum import Enum

class Role(Enum):
    MANAGER = "manager"
    EMPLOYEE = "employee"
    CUSTOMER = "customer"

class User(BaseModel):
    email: str
    password: str
    user_name: str
    role: Role = Role.CUSTOMER
    first_name: str
    last_name: str
    phone_num: str