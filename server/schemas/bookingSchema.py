from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BookingSchema(BaseModel):
    customer_id: str
    room_id: str
    check_in: datetime
    check_out: datetime
    guest_quantity: int
    days: int
    total_price: float
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True

class BookingUpdateSchema(BaseModel):
    customer_id: Optional[str]
    room_id: Optional[str]
    check_in: Optional[datetime]
    check_out: Optional[datetime]
    guest_quantity: Optional[int]
    days: Optional[int]
    total_price: Optional[float]
    created_at: Optional[datetime]
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True