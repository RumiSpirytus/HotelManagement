from fastapi import Depends
from fastapi.responses import JSONResponse
from sqlalchemy import or_, and_
from sqlalchemy.orm import Session
from database import get_db
from models.room import Room
from models.hotel import Hotel

class SearchController:
    def searchRoom(room_name: str = '', hotel_address: str = '', hotel_name: str = '', price: float = 0, page: int = 1, size: int = 10, db: Session = Depends(get_db)):
        skip = (page - 1) * size
        rooms = db.query(Room.id, Room.name, Room.logo, Hotel.address, Room.price).join(Hotel, Hotel.id == Room.hotel_id).filter(
            and_(
                Room.name.ilike(f"%{room_name}%"),
                Hotel.address.ilike(f"%{hotel_address}%"),
                Hotel.name.ilike(f"%{hotel_name}%"),
                Room.price <= price
            )
        ).offset(skip).limit(size).all()
        
        if len(rooms) == 0:
            return JSONResponse(status_code=404, content={"detail": "Rooms not found"})
        return [{"id": room[0], "name": room[1], "logo": room[2], "address": room[3], "price": room[4]} for room in rooms]