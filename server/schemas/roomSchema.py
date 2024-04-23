from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional

class RoomSchema(BaseModel):
    hotel_id: str
    name: str
    logo: str
    images: List[str]
    room_detail: str
    room_convenient: List[str]
    room_supplies: List[str]
    room_size: float
    rating: float
    price: float
    is_hired: bool = False
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True

class RoomUpdateSchema(BaseModel):
    hotel_id: Optional[str]
    name: Optional[str]
    logo: Optional[str]
    images: Optional[List[str]]
    room_detail: Optional[str]
    room_convenient: Optional[List[str]]
    room_supplies: Optional[List[str]]
    room_size: Optional[float]
    rating: Optional[float]
    price: Optional[float]
    is_hired: Optional[bool]
    created_at: Optional[datetime]
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True