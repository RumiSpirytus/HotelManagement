from fastapi import Depends, APIRouter, Query
from database import get_db
from sqlalchemy.orm import Session
from models.room import Room
from controllers.searchController import SearchController
from schemas.searchSchema import Search

router = APIRouter(prefix="/search", tags=["Search"], responses={404: {"description": "Not found"}})


@router.post("/rooms")
def search_rooms(data: Search, db: Session = Depends(get_db)):
    return SearchController.search_rooms(data, db)
