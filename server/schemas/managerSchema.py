from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ManagerSchema(BaseModel):
    name: str
    hotel_id: str
    first_name: str
    last_name: str
    phone_num: str
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True

class ManagerUpdateSchema(BaseModel):
    name: Optional[str]
    hotel_id: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    phone_num: Optional[str]

    class Config:
        orm_mode: True