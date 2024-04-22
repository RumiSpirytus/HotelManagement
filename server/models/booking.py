from database import Base
from sqlalchemy import Column, TIMESTAMP, text, Uuid, ForeignKey, Integer, Float
from sqlalchemy.orm import relationship

class Booking(Base):
    __tablename__ = "booking"

    id = Column(Uuid, primary_key=True, index=True)
    room_id = Column(Uuid, ForeignKey('room.id'), nullable=False)
    customer_id = Column(Uuid, ForeignKey('customer.id'), nullable=False)
    employee_id = Column(Uuid, ForeignKey('employee.id'), nullable=False)
    check_in = Column(TIMESTAMP(timezone=True), nullable=False)
    check_out = Column(TIMESTAMP(timezone=True), nullable=False)
    guest_quantity = Column(Integer, nullable=False)
    days = Column(Float, nullable=False)
    total_price = Column(Integer, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    room = relationship("Room", back_populates="booking")
    customer = relationship("Customer", back_populates="booking")
    payment = relationship("Payment", back_populates="booking")
    employee = relationship("Employee", back_populates="booking")
