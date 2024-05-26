from database import Base
from sqlalchemy import Column, String, TIMESTAMP, text, Uuid
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user"

    id = Column(Uuid, primary_key=True, index=True)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False, default='customer')
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    manager = relationship("Manager", back_populates="user", cascade="all, delete")
    employee = relationship("Employee", back_populates="user", cascade="all, delete")
    customer = relationship("Customer", back_populates="user", cascade="all, delete")
