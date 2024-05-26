from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum

class BookingStatusType(str, Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    CANCELLED = "CANCELLED"
    CHECKEDIN = "CHECKINED"

class BookingSchema(BaseModel):
    customer_id: str
    room_id: str
    check_in: datetime
    guest_quantity: int
    customer_name: str
    customer_email: str
    customer_phone: str
    status: BookingStatusType = BookingStatusType.PENDING
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True

class BookingUpdateSchema(BaseModel):
    customer_id: Optional[str] = None
    room_id: Optional[str] = None
    check_in: Optional[datetime] = None
    guest_quantity: Optional[int] = None
    customer_name: Optional[str] = None
    customer_email: Optional[str] = None
    customer_phone: Optional[str] = None
    status: Optional[BookingStatusType] = None
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True