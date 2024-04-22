from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

from os import environ  

DB_USER = environ.get('DB_USER')
DB_PASSWORD = environ.get('DB_PASSWORD')
DB_HOST = environ.get('DB_HOST')
DB_PORT = environ.get('DB_PORT')
DB_NAME = environ.get('DB_NAME')

SQLALCHEMY_DATABASE_URL = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()