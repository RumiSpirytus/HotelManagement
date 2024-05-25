from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class HotelSchema(BaseModel):
    manager_id: str
    name: str
    description: str
    logo: str
    images: list
    address: str
    rating: Optional[float] = 5
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True

class HotelUpdateSchema(BaseModel):
    manager_id: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    logo: Optional[str] = None
    images: Optional[list] = None
    address: Optional[str] = None
    rating: Optional[float] = None
    created_at: Optional[datetime] = None
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True