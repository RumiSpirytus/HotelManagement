from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import get_db
from models.room import Room
from models.hotel import Hotel
from schemas.roomSchema import RoomSchema, RoomUpdateSchema
import uuid
from datetime import datetime
from pytz import utc

class RoomController:
    def getAllRooms(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
        skip = (page - 1) * size
        return db.query(Room).offset(skip).limit(size).all()
    
    def getAvailableRooms(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
        skip = (page - 1) * size
        rooms = db.query(Hotel.address, Room.name, Room.price, Room.logo, Room.id).join(Hotel, Hotel.id == Room.hotel_id).filter(Room.is_hired == False).offset(skip).limit(size).all()
        return [{"address": room[0], "name": room[1], "price": room[2], "logo": room[3], "id": room[4]} for room in rooms]
        
    def createRoom(room: RoomSchema, db: Session = Depends(get_db)):
        db_room = Room(
            id=uuid.uuid4(),
            hotel_id=room.hotel_id,
            name=room.name,
            logo=room.logo,
            images=room.images,
            room_detail=room.room_detail,
            room_convenient=room.room_convenient,
            room_supplies=room.room_supplies,
            room_size=room.room_size,
            rating=room.rating,
            price=room.price,
            is_hired=room.is_hired,
            created_at=room.created_at,
            updated_at=room.updated_at,
        )
        db.add(db_room)
        db.commit()
        db.refresh(db_room)
        return JSONResponse(content=db_room.to_dict(), status_code=201)
    
    def getRoomById(id: uuid.UUID, db: Session = Depends(get_db)):
        room = db.query(Room.id, Hotel.id, Hotel.address, Room.logo, Room.name, Room.rating, Room.price, Room.room_detail, Room.room_convenient, Room.room_supplies, Room.images, Room.room_size, Room.is_hired).join(Room, Room.hotel_id == Hotel.id).filter(Room.id == id).first()
        if room is None:
            raise HTTPException(status_code=404, detail="Room not found")
        
        return { "id": room[0], "hotel_id": room[1], "address": room[2], "logo": room[3], "name": room[4], "rating": room[5], "price": room[6], "room_detail": room[7], "room_convenient": room[8], "room_supplies": room[9], "images": room[10], "room_size": room[11], "is_hired": room[12]}
    
    def updateRoom(id: uuid.UUID, room: RoomUpdateSchema, db: Session = Depends(get_db)):
        db_room = db.query(Room).filter(Room.id == id)
        if room.name is not None:
            db_room.name = room.name
        if room.logo is not None:
            db_room.logo = room.logo
        if room.images is not None:
            db_room.images = room.images
        if room.room_detail is not None:
            db_room.room_detail = room.room_detail
        if room.room_convenient is not None:
            db_room.room_convenient = room.room_convenient
        if room.room_supplies is not None:
            db_room.room_supplies = room.room_supplies
        if room.hotel_id is not None:
            db_room.hotel_id = room.hotel_id
        if room.is_hired is not None:
            db_room.is_hired = room.is_hired
        if room.room_size is not None:
            db_room.room_size = room.room_size
        if room.rating is not None:
            db_room.rating = room.rating
        if room.price is not None:
            db_room.price = room.price
        
        db_room.updated_at = datetime.now(utc)      
        db.commit()
        return { "message": "Room updated successfully"}
    
    def deleteRoom(id: uuid.UUID, db: Session = Depends(get_db)):
        db.query(Room).filter(Room.id == id).delete()
        db.commit()
        return None