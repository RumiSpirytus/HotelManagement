from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.hotel import Hotel
from schemas.hotelSchema import HotelSchema, HotelUpdateSchema
from fastapi.responses import JSONResponse
from models.manager import Manager
import uuid
def is_valid_uuid(uuid_to_test, version=4):
    try:
        uuid_obj = uuid.UUID(uuid_to_test, version=version)
    except ValueError:
        return False
    return str(uuid_obj) == uuid_to_test

class HotelController:
    def getAllHotels(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
        skip = (page - 1) * size
        return db.query(Hotel).offset(skip).limit(size).all()
    
    def getHotelById(id: uuid.UUID, db: Session = Depends(get_db)):
        return db.query(Hotel).filter(Hotel.id == id).first()
    
    def getPopularHotel(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
        skip = (page - 1) * size
        hotels = db.query(Hotel.id, Hotel.name, Hotel.logo, Hotel.rating, Hotel.address).order_by(Hotel.rating.desc()).offset(skip).limit(size).all()
        return [{"id": hotel[0], "name": hotel[1], "logo": hotel[2], "rating": hotel[3], "address": hotel[4]} for hotel in hotels]
    
    def createHotel(hotel: HotelSchema, db: Session = Depends(get_db)):
        #check manager_id
        if not is_valid_uuid(hotel.manager_id):
            raise HTTPException(status_code=400, detail="Invalid manager_id")
        manager = db.query(Manager).filter(Manager.id == hotel.manager_id).first()
        if manager is None:
            raise HTTPException(status_code=404, detail="Manager not existed")
        
        hotel_id = uuid.uuid4()
        db_hotel = Hotel(
            id=hotel_id,
            manager_id=hotel.manager_id,
            name=hotel.name,
            description= hotel.description,
            logo=hotel.logo,
            images=hotel.images,
            address=hotel.address,
            rating=hotel.rating,
            created_at=hotel.created_at,
            updated_at=hotel.updated_at,
        )
        db.add(db_hotel)
        db.commit()
        db.refresh(db_hotel)
        return JSONResponse(content=db_hotel.to_dict(), status_code=201)
    
    def updateHotel(id: uuid.UUID, hotel: HotelUpdateSchema, db: Session = Depends(get_db)):
        db_hotel = db.query(Hotel).filter(Hotel.id == id).first()
        if hotel.name is not None:
            db_hotel.name = hotel.name
        if hotel.description is not None:
            db_hotel.description = hotel.description
        if hotel.logo is not None:
            db_hotel.logo = hotel.logo
        if hotel.images is not None:
            db_hotel.images = hotel.images
        if hotel.address is not None:
            db_hotel.address = hotel.address
        if hotel.rating is not None:
            db_hotel.rating = hotel.rating
        db_hotel.updated_at = hotel.updated_at
        db.commit()
        return JSONResponse(content={"message": "Hotel updated successfully"}, status_code=200)
    
    def deleteHotel(id: uuid.UUID, db: Session = Depends(get_db)):
        db.query(Hotel).filter(Hotel.id == id).delete()
        db.commit()
        return JSONResponse(content={"message": "Hotel deleted successfully"}, status_code=200)
    
    def getHotelByManagerId(manager_id: uuid.UUID, db: Session = Depends(get_db)):
        hotels = db.query(Hotel).filter(Hotel.manager_id == manager_id).all()
        data = []
        for hotel in hotels:
            data.append({
                "id": hotel.id,
                "name": hotel.name,
                "address": hotel.address,
                "description": hotel.description,
                "logo": hotel.logo,
                "rating": hotel.rating,
            })
        return data
    
    def getHotelIdByEmployeeId(employee_id: uuid.UUID, db: Session = Depends(get_db)):
        hotel = db.query(Hotel).join(Manager).filter(Manager.employee_id == employee_id).first()
        return hotel.id