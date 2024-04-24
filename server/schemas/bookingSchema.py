from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BookingSchema(BaseModel):
    customer_id: str
    room_id: str
    check_in: datetime
    guest_quantity: int
    customer_name: str
    customer_email: str
    customer_phone: str
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True

class BookingUpdateSchema(BaseModel):
    customer_id: Optional[str]
    room_id: Optional[str]
    check_in: Optional[datetime]
    guest_quantity: Optional[int]
    customer_name: Optional[str]
    customer_email: Optional[str]
    customer_phone: Optional[str]
    created_at: Optional[datetime]
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True