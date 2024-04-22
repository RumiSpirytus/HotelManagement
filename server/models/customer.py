from database import Base
from sqlalchemy import Column, String, Uuid, ForeignKey, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID as Uuid
from sqlalchemy.orm import relationship

class Customer(Base):
    __tablename__ = "customer"

    id = Column(Uuid, primary_key=True, index=True)
    user_id = Column(Uuid, ForeignKey('user.id'), nullable=False)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    phone_num = Column(String, nullable=True)
    bank_num = Column(String, nullable=True)
    bank_name = Column(String, nullable=True)
    citizen_id = Column(String, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    user = relationship("User", back_populates="customer")
    booking = relationship("Booking", back_populates="customer")
    payment = relationship("Payment", back_populates="customer")
