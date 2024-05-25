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
    hotel_id: Optional[str] = None
    name: Optional[str] = None
    logo: Optional[str] = None
    images: Optional[List[str]] = None
    room_detail: Optional[str] = None
    room_convenient: Optional[List[str]] = None
    room_supplies: Optional[List[str]] = None
    room_size: Optional[float] = None
    rating: Optional[float] = None
    price: Optional[float] = None
    is_hired: Optional[bool] = None
    created_at: Optional[datetime] = None
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True