from fastapi import Depends, APIRouter
from database import get_db
from sqlalchemy.orm import Session
from models.room import Room
from controllers.searchController import SearchController

router = APIRouter(prefix="/search", tags=["Search"], responses={404: {"description": "Not found"}})

@router.get("/room")
async def search_room(room_name: str = '', hotel_address: str = '', hotel_name: str = '', price: float = 0, page: int = 1, size: int = 10, db: Session = Depends(get_db)):
    return SearchController.searchRoom(room_name, hotel_address, hotel_name, price, page, size, db)