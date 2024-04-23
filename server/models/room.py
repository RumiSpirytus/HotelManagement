from database import Base
from sqlalchemy import Column, String, TIMESTAMP, text, Uuid, ARRAY, Float, ForeignKey, Boolean, inspect, Double
from sqlalchemy.dialects.postgresql import UUID as Uuid
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

class Room(Base):
    
    def to_dict(self):
        return {c.key: getattr(self, c.key).isoformat() if isinstance(getattr(self, c.key), datetime) else str(getattr(self, c.key)) if isinstance(getattr(self, c.key), uuid.UUID) else getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
    
    __tablename__ = "room"

    id = Column(Uuid, primary_key=True, index=True)
    name = Column(String, nullable=False)
    logo = Column(String, nullable=False)
    images = Column(ARRAY(String), nullable=True)
    room_detail = Column(String, nullable=False)
    room_convenient = Column(ARRAY(String), nullable=True)
    room_supplies = Column(ARRAY(String), nullable=True)
    room_size = Column(Float, nullable=True)
    rating = Column(Float, nullable=True)
    price = Column(Double, nullable=False)
    is_hired = Column(Boolean, nullable=False, default=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    hotel_id = Column(Uuid, ForeignKey('hotel.id'), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    hotel = relationship("Hotel", back_populates="room")
    booking = relationship("Booking", back_populates="room")
