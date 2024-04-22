from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CustomerSchema(BaseModel):
    user_id: str
    first_name: str
    last_name: str
    phone_num: str
    bank_num: str
    bank_name: str
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True

class CustomerUpdateSchema(BaseModel):
    user_id: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    phone_num: Optional[str]
    bank_num: Optional[str]
    bank_name: Optional[str]
    created_at: Optional[datetime]
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True