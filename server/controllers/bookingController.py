from schemas.bookingSchema import BookingSchema
from models.room import Room
from models.booking import Booking
from models.customer import Customer
from models.hotel import Hotel
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
        
        room.is_hired = True
        db.commit()
        
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
            status=booking.status,
            created_at=booking.created_at,
            updated_at=booking.updated_at,
        )
        db.add(db_booking)
        db.commit()
        db.refresh(db_booking)
        return JSONResponse(content=db_booking.to_dict(), status_code=201)
    
    def getAllBookings(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
        rooms = db.query(Room.id, Room.logo, Room.name, Hotel.address, Booking.id, Booking.customer_id, Booking.status).join(Room, Booking.room_id == Room.id).join(Hotel, Room.hotel_id == Hotel.id).all()
        return [{"room_id": room[0], "logo": room[1], "room_name": room[2], "hotel_address": room[3], "booking_id": room[4], "customer_id": room[5], "status": room[6]} for room in rooms]
    
    def getBookingByUserId(customer_id: uuid.UUID, page: int = 1, size: int = 10, db: Session = Depends(get_db)):
        rooms = db.query(Room.id, Room.logo, Room.name, Hotel.address, Booking.id, Booking.customer_id, Booking.status).join(Room, Booking.room_id == Room.id).join(Hotel, Room.hotel_id == Hotel.id).filter(Booking.customer_id == customer_id).offset((page-1)*size).limit(size).all()
        return [{"room_id": room[0], "logo": room[1], "room_name": room[2], "hotel_address": room[3], "booking_id": room[4], "customer_id": room[5], "status": room[6]} for room in rooms]
    
    def getBookingById(id: uuid.UUID, db: Session = Depends(get_db)):
        booking = db.query(Booking).filter(Booking.id == id).first()
        if booking is None:
            raise HTTPException(status_code=404, detail="Booking not found")
        return booking.to_dict()
    
    def deleteBooking(id: uuid.UUID, db: Session = Depends(get_db)):
        booking = db.query(Booking).filter(Booking.id == id).first()
        if booking is None:
            raise HTTPException(status_code=404, detail="Booking not found")
        db.delete(booking)
        db.commit()
        return JSONResponse(content={"message": "Booking deleted successfully"}, status_code=200)
    
    def updateBooking(id: uuid.UUID, booking: BookingSchema, db: Session = Depends(get_db)):
        query = db.query(Booking).filter(Booking.id == id)
        db_booking = query.first()
        if db_booking is None:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        if booking.status == 'CANCELLED':
            room = db.query(Room).filter(Room.id == db_booking.room_id).first()
            room.is_hired = False
            db.commit()
            
        if booking.status == 'CONFIRMED':
            room = db.query(Room).filter(Room.id == db_booking.room_id).first()
            room.is_hired = True
            db.commit()
            
        if booking.status == 'PENDING':
            room = db.query(Room).filter(Room.id == db_booking.room_id).first()
            room.is_hired = True
            db.commit()
            
        if booking.status == 'CHECKED_IN':
            room = db.query(Room).filter(Room.id == db_booking.room_id).first()
            room.is_hired = True
            db.commit()
        
        if booking.status == 'CHECKED_OUT':
            room = db.query(Room).filter(Room.id == db_booking.room_id).first()
            room.is_hired = False
            db.commit()
            
        
        update_data = booking.model_dump(exclude_unset=True)
        
        query.update(update_data)
        db.commit()
        return {"message": "Booking updated successfully"}
    
    def getBookingByHotelId(hotel_id: uuid.UUID, page: int = 1, size: int = 10, db: Session = Depends(get_db)):
        rooms = db.query(Room.id, Room.logo, Room.name, Hotel.address, Booking.id, Booking.customer_id, Booking.status, Booking.customer_email, Booking.customer_phone, Booking.customer_name).join(Room, Booking.room_id == Room.id).join(Hotel, Room.hotel_id == Hotel.id).filter(Hotel.id == hotel_id).offset((page-1)*size).limit(size).all()
        return [{"room_id": room[0], "logo": room[1], "room_name": room[2], "hotel_address": room[3], "booking_id": room[4], "customer_id": room[5], "status": room[6], "customer_email": room[7], "customer_phone": room[8], "customer_name": room[9]} for room in rooms]
    
    def getBookingCheckedInByHotelId(hotel_id: uuid.UUID, page: int = 1, size: int = 10, db: Session = Depends(get_db)):
        rooms = db.query(Room.id, Room.logo, Room.name, Hotel.address, Booking.id, Booking.customer_id, Booking.status, Booking.customer_email, Booking.customer_phone, Booking.customer_name, Booking.check_in, Booking.guest_quantity, Room.price, Booking.customer_id).join(Room, Booking.room_id == Room.id).join(Hotel, Room.hotel_id == Hotel.id).filter(Hotel.id == hotel_id, Booking.status == 'CHECKED_IN').offset((page-1)*size).limit(size).all()
        return [{"room_id": room[0], "logo": room[1], "room_name": room[2], "hotel_address": room[3], "booking_id": room[4], "customer_id": room[5], "status": room[6], "customer_email": room[7], "customer_phone": room[8], "customer_name": room[9], "check_in": room[10], "guest_quantity": room[11], "price": room[12], "customer_id": room[13]} for room in rooms]