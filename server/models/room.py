from database import Base
from sqlalchemy import Column, String, TIMESTAMP, text, Uuid, ARRAY, JSON, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID as Uuid
from sqlalchemy.orm import relationship

class Room(Base):
    __tablename__ = "room"

    id = Column(Uuid, primary_key=True, index=True)
    name = Column(String, nullable=False)
    logo = Column(String, nullable=False)
    images = Column(ARRAY(String), nullable=True)
    room_detail = Column(String, nullable=False)
    service = Column(ARRAY(JSON), nullable=True)
    rating = Column(Float, nullable=True)
    price = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    hotel_id = Column(Uuid, ForeignKey('hotel.id'), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    hotel = relationship("Hotel", back_populates="room")
    booking = relationship("Booking", back_populates="room")
