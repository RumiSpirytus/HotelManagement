from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from controllers.hotelController import HotelController
from database import get_db
from schemas.hotelSchema import HotelSchema

router = APIRouter(prefix="/hotel", tags=["Hotel"], responses={404: {"description": "Not found"}})

@router.get("/")
async def get_all_hotels(page: int = 1, size: int = 10, db: Session = Depends(get_db) ):
    return HotelController.getAllHotels(page, size, db)

@router.get("/popular")
async def get_popular_hotel(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
    return HotelController.getPopularHotel(page, size, db)

@router.get("/{id}")
async def get_hotel_by_id(id: str, db: Session = Depends(get_db)):
    return HotelController.getHotelById(id, db)

@router.get('/manager/{manager_id}')
def get_hotel_by_manager_id(manager_id: str, db: Session = Depends(get_db)):
    return HotelController.getHotelByManagerId(manager_id, db)

@router.post("")
async def create_hotel(hotel: HotelSchema, db: Session = Depends(get_db)):
    return HotelController.createHotel(hotel, db)

@router.put("/{id}")
async def update_hotel(id: str, hotel: HotelSchema, db: Session = Depends(get_db)):
    return HotelController.updateHotel(id, hotel, db)

@router.delete("/{id}")
async def delete_hotel(id: str, db: Session = Depends(get_db)):
    return HotelController.deleteHotel(id, db)