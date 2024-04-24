from schemas.bookingSchema import BookingSchema
from models.room import Room
from models.booking import Booking
from models.customer import Customer
import uuid
from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import get_db

class BookingController:
    def addBooking(booking: BookingSchema, db: Session = Depends(get_db)):
        #check room_id
        room = db.query(Room).filter(Room.id == booking.room_id).first()
        if room is None:
            raise HTTPException(status_code=404, detail="Room not existed")
        
        #check customer_id
        customer = db.query(Customer).filter(Customer.id == booking.customer_id).first()
        if customer is None:
            raise HTTPException(status_code=404, detail="Customer not existed")
        
        booking_id = uuid.uuid4()
        db_booking = Booking(
            id=booking_id,
            room_id=booking.room_id,
            customer_id=booking.customer_id,
            check_in=booking.check_in,
            guest_quantity=booking.guest_quantity,
            customer_name=booking.customer_name,
            customer_email=booking.customer_email,
            customer_phone=booking.customer_phone,
            created_at=booking.created_at,
            updated_at=booking.updated_at,
        )
        db.add(db_booking)
        db.commit()
        db.refresh(db_booking)
        return JSONResponse(content=db_booking.to_dict(), status_code=201)