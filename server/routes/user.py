from fastapi import FastAPI, APIRouter, Request, HTTPException
from schemas.user import User
from controllers import userController

from database.supabase import create_supabase_client

supabase = create_supabase_client()

router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}},
)

@router.post("/register")
def register(user: User):
    return userController.register(user)