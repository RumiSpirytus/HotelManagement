from fastapi import Depends
from sqlalchemy.orm import Session
from database import get_db
from models.room import Room
from schemas.roomSchema import RoomSchema, RoomUpdateSchema
import uuid
from datetime import datetime
from pytz import utc

class RoomController:
    def getAllRooms(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
        skip = (page - 1) * size
        return db.query(Room).offset(skip).limit(size).all()
    
    def createRoom(room: RoomSchema, db: Session = Depends(get_db)):
        db_room = Room(
            id=uuid.uuid4(),
            name=room.name,
            logo=room.logo,
            images=room.images,
            room_detail=room.room_detail,
            service=room.service,
            rating=room.rating,
            price=room.price,
            created_at=room.created_at,
            updated_at=room.updated_at,
        )
        db.add(db_room)
        db.commit()
        db.refresh(db_room)
        return db_room
    
    def getRoomById(id: uuid.UUID, db: Session = Depends(get_db)):
        return db.query(Room).filter(Room.id == id).first()
    
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
        if room.service is not None:
            db_room.service = room.service

        db_room.updated_at = datetime.now(utc)      
        db.commit()
        return { "message": "Room updated successfully"}
    
    def deleteRoom(id: uuid.UUID, db: Session = Depends(get_db)):
        db.query(Room).filter(Room.id == id).delete()
        db.commit()
        return None