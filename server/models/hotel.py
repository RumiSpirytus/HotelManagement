from database import Base
from sqlalchemy import Column, String, TIMESTAMP, text, Uuid, ARRAY,ForeignKey, Float
from sqlalchemy.orm import relationship

class Hotel(Base):
    __tablename__ = "hotel"

    id = Column(Uuid, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    logo = Column(String, nullable=False)
    images = Column(ARRAY(String), nullable=True)
    address = Column(String, nullable=False)
    rating = Column(Float, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    room = relationship("Room", back_populates="hotel")
    manager = relationship("Manager", back_populates="hotel", uselist=False)
    employee = relationship("Employee", back_populates="hotel")

