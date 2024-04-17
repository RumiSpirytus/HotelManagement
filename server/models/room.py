from database import Base
from sqlalchemy import Column, String, TIMESTAMP, text, Uuid, ARRAY, JSON, Float

class Room(Base):
    __tablename__ = "rooms"

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