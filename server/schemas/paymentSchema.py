from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PaymentSchema(BaseModel):
    customer_id: str
    booking_id: str
    employee_id: str
    amount: float
    payment_date: datetime
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True

class PaymentUpdateSchema(BaseModel):
    customer_id: Optional[str]
    booking_id: Optional[str]
    employee_id: Optional[str]
    amount: Optional[float]
    payment_date: Optional[datetime]
    created_at: Optional[datetime]
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True