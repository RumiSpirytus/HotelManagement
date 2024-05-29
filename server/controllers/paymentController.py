from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import get_db
from schemas.paymentSchema import PaymentSchema
from models.payment import Payment
from models.booking import Booking
from models.room import Room
from models.hotel import Hotel
import uuid

class PaymentController:
    def addPayment(payment: PaymentSchema, db: Session = Depends(get_db)):
        
        # update booking status
        booking = db.query(Booking).filter(Booking.id == payment.booking_id).first()
        if booking is None:
            raise HTTPException(status_code=404, detail="Booking not existed")
        
        booking.status = "CHECKED_OUT"
        db.commit()
        
        # update room is hired 
        room = db.query(Room).filter(Room.id == booking.room_id).first()
        if room is None:
            raise HTTPException(status_code=404, detail="Room not existed")
        
        room.is_hired = False
        db.commit()
        
        payment_id = uuid.uuid4()
        db_payment = Payment(
            id=payment_id,
            customer_id=payment.customer_id,
            booking_id=payment.booking_id,
            employee_id=payment.employee_id,
            amount=payment.amount,
            payment_date=payment.payment_date
        )
        db.add(db_payment)
        db.commit()
        db.refresh(db_payment)
        return JSONResponse(content=db_payment.to_dict(), status_code=201)
    
    def getAllPayments(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
        payments = db.query(Payment).offset((page-1)*size).limit(size).all()
        return [payment.to_dict() for payment in payments]
    
    def getPaymentById(id: int, db: Session = Depends(get_db)):
        payment = db.query(Payment).filter(Payment.id == id).first()
        if payment is None:
            raise HTTPException(status_code=404, detail="Payment not found")
        return payment.to_dict()
    
    def getAllPaymentsByHotelId(hotel_id: str, page: int = 1, size: int = 10, db: Session = Depends(get_db)):
        payments = db.query(Payment.amount, Booking.guest_quantity).join(Booking, Payment.booking_id == Booking.id).join(Room, Booking.room_id == Room.id).filter(Room.hotel_id == hotel_id).offset((page-1)*size).limit(size).all()
        return [{"amount": payment[0], "guest_quantity": payment[1]} for payment in payments]
    
    def getAllPaymentsByManagerId(manager_id: str, db: Session = Depends(get_db)):
        payments = db.query(Payment.amount, Booking.guest_quantity).join(Booking, Payment.booking_id == Booking.id).join(Room, Booking.room_id == Room.id).join(Hotel, Room.hotel_id == Hotel.id).filter(Hotel.manager_id == manager_id).all()
        return [{"amount": payment[0], "guest_quantity": payment[1]} for payment in payments]