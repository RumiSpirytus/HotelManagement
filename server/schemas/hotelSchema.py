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
    manager_id: Optional[str]
    name: Optional[str]
    description: Optional[str]
    logo: Optional[str]
    images: Optional[list]
    address: Optional[str]
    rating: Optional[float]
    created_at: Optional[datetime]
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True