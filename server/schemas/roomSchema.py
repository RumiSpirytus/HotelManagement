from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional

class RoomSchema(BaseModel):
    name: str
    logo: str
    images: List[str]
    room_detail: str
    service: List[dict]
    rating: float
    price: str
    hotel_id: str
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True

class RoomUpdateSchema(BaseModel):
    name: Optional[str]
    logo: Optional[str]
    images: Optional[List[str]]
    room_detail: Optional[str]
    service: Optional[List[dict]]
    rating: Optional[float]
    price: Optional[str]
    hotel_id: Optional[str]
    created_at: Optional[datetime]
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True