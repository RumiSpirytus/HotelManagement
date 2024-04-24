from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from controllers.bookingController import BookingController
from schemas.bookingSchema import BookingSchema

router = APIRouter(prefix="/booking", tags=["Booking"], responses={404: {"description": "Not found"}})

@router.get("/")
async def get_all_bookings(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
    return BookingController.getAllBookings(page, size, db)

@router.get("/{id}")
async def get_booking_by_id(id: str, db: Session = Depends(get_db)):
    return BookingController.getBookingById(id, db)

@router.post("/")
async def add_booking(booking: BookingSchema, db: Session = Depends(get_db)):
    return BookingController.addBooking(booking, db)