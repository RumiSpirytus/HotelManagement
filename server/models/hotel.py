from database import Base
from sqlalchemy import Column, String, TIMESTAMP, text, Uuid, ARRAY,ForeignKey, Float, inspect
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

class Hotel(Base):
    
    def to_dict(self):
        return {c.key: getattr(self, c.key).isoformat() if isinstance(getattr(self, c.key), datetime) else str(getattr(self, c.key)) if isinstance(getattr(self, c.key), uuid.UUID) else getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
    
    __tablename__ = "hotel"

    id = Column(Uuid, primary_key=True, index=True)
    manager_id = Column(Uuid, ForeignKey('manager.id'), nullable=False)
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

    room = relationship("Room", back_populates="hotel", cascade="all, delete")
    manager = relationship("Manager", back_populates="hotel")
    employee = relationship("Employee", back_populates="hotel")

