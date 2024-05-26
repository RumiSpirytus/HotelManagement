from database import Base
from sqlalchemy import Column, TIMESTAMP, inspect, text, Uuid, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

class Booking(Base):
    __tablename__ = "booking"
    
    def to_dict(self):
        return {c.key: getattr(self, c.key).isoformat() if isinstance(getattr(self, c.key), datetime) else str(getattr(self, c.key)) if isinstance(getattr(self, c.key), uuid.UUID) else getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

    id = Column(Uuid, primary_key=True, index=True)
    room_id = Column(Uuid, ForeignKey('room.id'), nullable=False)
    customer_id = Column(Uuid, ForeignKey('customer.id'), nullable=False)
    check_in = Column(TIMESTAMP(timezone=True), nullable=False)
    guest_quantity = Column(Integer, nullable=False)
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    status = Column(String)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    room = relationship("Room", back_populates="booking")
    customer = relationship("Customer", back_populates="booking")
    payment = relationship("Payment", back_populates="booking")
