from fastapi import Depends
from fastapi.responses import JSONResponse
from sqlalchemy import func, or_, and_, text
from sqlalchemy.orm import Session
from database import get_db
from models.room import Room
from models.hotel import Hotel
from unidecode import unidecode
from schemas.searchSchema import Search

class SearchController:
    def search_rooms(data: Search, db: Session = Depends(get_db)):
        query = db.query(Hotel.address, Room.name, Room.price, Room.logo, Room.id).join(Hotel)
        if data.room_name:
            data.room_name = data.room_name.strip()
            query = query.filter(func.lower(func.unaccent(Room.name)).like(f"%{unidecode(data.room_name.lower())}%"))
        if data.hotel_name:
            data.hotel_name = data.hotel_name.strip()
            query = query.filter(func.lower(func.unaccent(Hotel.name)).like(f"%{unidecode(data.hotel_name.lower())}%"))
        if data.address:
            data.address = data.address.strip()
            query = query.filter(func.lower(func.unaccent(Hotel.address)).like(f"%{unidecode(data.address.lower())}%"))
        if data.max_price:
            query = query.filter(Room.price <= data.max_price)
        query = query.order_by(Room.price)
        rooms = query.all()
        return [{"address": room[0], "name": room[1], "price": room[2], "logo": room[3], "id": room[4]} for room in rooms]
            
                