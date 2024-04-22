from database import Base
from sqlalchemy import Column, String, TIMESTAMP, text, Uuid, ForeignKey
from sqlalchemy.orm import relationship

class Employee(Base):
    __tablename__ = "employee"

    id = Column(Uuid, primary_key=True, index=True)
    user_id = Column(Uuid, ForeignKey('user.id'), nullable=False)
    hotel_id = Column(Uuid, ForeignKey('hotel.id'), nullable=True)
    manager_id = Column(Uuid, ForeignKey('manager.id'), nullable=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    phone_num = Column(String, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    hotel = relationship("Hotel", back_populates="employee")
    manager = relationship("Manager", back_populates="employee")
    user = relationship("User", back_populates="employee")
    booking = relationship("Booking", back_populates="employee")
    payment = relationship("Payment", back_populates="employee")
