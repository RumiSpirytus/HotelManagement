from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from sqlalchemy.orm import Session
from controllers.roomController import RoomController
from schemas.roomSchema import RoomSchema, RoomUpdateSchema
import uuid

router = APIRouter(prefix="/room", tags=["Room"], responses={404: {"description": "Not found"}})

@router.get("/")
async def get_all_rooms(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
    rooms = RoomController.getAllRooms(page, size, db)
    if rooms is None:
        raise HTTPException(status_code=404, detail="Rooms not found")
    return rooms

@router.get("/{id}")
async def get_room_by_id(id: uuid.UUID, db: Session = Depends(get_db)):
    room = RoomController.getRoomById(id, db)
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return room

@router.put("/{id}")
async def update_room(id: uuid.UUID, room: RoomUpdateSchema, db: Session = Depends(get_db)):
    existedRoom = RoomController.getRoomById(id, db)
    if existedRoom is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return RoomController.updateRoom(id, room, db)

@router.post("/")
async def create_room(room: RoomSchema, db: Session = Depends(get_db)):
    return RoomController.createRoom(room, db)

@router.delete("/{id}")
async def delete_room(id: uuid.UUID, db: Session = Depends(get_db)):
    room = RoomController.getRoomById(id, db)
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return RoomController.deleteRoom(id, db)