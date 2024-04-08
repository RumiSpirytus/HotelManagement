import bcrypt
from fastapi import FastAPI
from schemas.user import User
from database.supabase import create_supabase_client
from routes import user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(user.router, prefix='/api')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "sentry-trace", "baggage"],
)
