from database import Base
from sqlalchemy import Uuid, Column, ForeignKey, String, TIMESTAMP, text
from sqlalchemy.orm import relationship

class Manager(Base):
    __tablename__ = 'manager'

    id = Column(Uuid, primary_key=True, index=True)
    user_id = Column(Uuid, ForeignKey('user.id'), nullable=False)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    phone_num = Column(String, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    hotel = relationship("Hotel", back_populates="manager")
    user = relationship("User", back_populates="manager")
    employee = relationship("Employee", back_populates="manager")
