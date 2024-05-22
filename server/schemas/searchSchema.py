from pydantic import BaseModel
from typing import Optional

class Search(BaseModel):
    room_name: Optional[str] = None
    hotel_name: Optional[str] = None
    address: Optional[str] = None
    max_price: Optional[int] = None
    
    class Config:
        orm_mode = True