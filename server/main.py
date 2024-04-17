from fastapi import FastAPI
from database import Base, engine
from routes import roomRouter, userRouter
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(roomRouter.router, prefix='/api')
app.include_router(userRouter.router, prefix='/api')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "sentry-trace", "baggage"],
)