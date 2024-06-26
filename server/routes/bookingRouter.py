from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from controllers.bookingController import BookingController
from schemas.bookingSchema import BookingSchema, BookingUpdateSchema

router = APIRouter(prefix="/booking", tags=["Booking"], responses={404: {"description": "Not found"}})

@router.get("")
async def get_all_bookings(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
    return BookingController.getAllBookings(page, size, db)

@router.get("/{id}")
async def get_booking_by_id(id: str, db: Session = Depends(get_db)):
    return BookingController.getBookingById(id, db)

@router.get("/hotel/{hotel_id}")
async def get_booking_by_hotel_id(hotel_id: str, page: int = 1, size: int = 10, db: Session = Depends(get_db)):
    return BookingController.getBookingByHotelId(hotel_id, page, size, db)

@router.get("/hotel/checked-in/{hotel_id}")
async def get_checked_in_booking_by_hotel_id(hotel_id: str, page: int = 1, size: int = 10, db: Session = Depends(get_db)):
    return BookingController.getBookingCheckedInByHotelId(hotel_id, page, size, db)

@router.post("")
async def add_booking(booking: BookingSchema, db: Session = Depends(get_db)):
    return BookingController.addBooking(booking, db)

@router.get("/customer/{customer_id}")
async def get_booking_by_user_id(customer_id: str, page: int = 1, size: int = 10, db: Session = Depends(get_db)):
    return BookingController.getBookingByUserId(customer_id, page, size, db)

@router.delete("/{id}")
async def delete_booking(id: str, db: Session = Depends(get_db)):
    return BookingController.deleteBooking(id, db)

@router.put("/{id}")
async def update_booking(id: str, booking: BookingUpdateSchema, db: Session = Depends(get_db)):
    return BookingController.updateBooking(id, booking, db)