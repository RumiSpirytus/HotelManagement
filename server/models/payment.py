from database import Base
from sqlalchemy import Column, Integer, TIMESTAMP, Uuid, ForeignKey, text, Float
from sqlalchemy.orm import relationship 

class Payment(Base):
    __tablename__ = "payment"

    id = Column(Uuid, primary_key=True, index=True)
    customer_id = Column(Uuid, ForeignKey('customer.id'), nullable=False)
    booking_id = Column(Uuid, ForeignKey('booking.id'), nullable=False)
    employee_id = Column(Uuid, ForeignKey('employee.id'), nullable=False)
    amount = Column(Float, nullable=False)
    payment_date = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    customer = relationship("Customer", back_populates="payment")
    booking = relationship("Booking", back_populates="payment")
    employee = relationship("Employee", back_populates="payment")
