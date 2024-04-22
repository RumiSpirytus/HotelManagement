from fastapi import FastAPI
from models.user import User
from models.manager import Manager
from models.customer import Customer
from models.employee import Employee
from models.hotel import Hotel
from models.room import Room
from models.booking import Booking
from models.payment import Payment
from database import Base, engine
from routes import roomRouter, userRouter, hotelRouter
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(roomRouter.router, prefix='/api')
app.include_router(userRouter.router, prefix='/api')
app.include_router(hotelRouter.router, prefix='/api')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "sentry-trace", "baggage"],
)