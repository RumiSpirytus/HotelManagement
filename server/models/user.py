from database import Base
from sqlalchemy import Column, String, TIMESTAMP, text, Uuid

class User(Base):
    __tablename__ = "users"

    id = Column(Uuid, primary_key=True, index=True)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False, default='customer')
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    class Config:
        orm_mode = True