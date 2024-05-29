from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.paymentSchema import PaymentSchema
from controllers.paymentController import PaymentController


router = APIRouter(prefix="/payment", tags=["Payment"], responses={404: {"description": "Not found"}})

@router.post("")
async def add_payment(payment: PaymentSchema, db: Session = Depends(get_db)):
    return PaymentController.addPayment(payment, db)

@router.get("")
async def get_all_payments(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
    return PaymentController.getAllPayments(page, size, db)

@router.get("/{id}")
async def get_payment_by_id(id: int, db: Session = Depends(get_db)):
    return PaymentController.getPaymentById(id, db)

@router.get("/hotel/{hotel_id}")
async def get_payment_by_hotel_id(hotel_id: str, page: int = 1, size: int = 10, db: Session = Depends(get_db)):
    return PaymentController.getAllPaymentsByHotelId(hotel_id, page, size, db)

@router.get("/manager/{manager_id}")
def get_payment_by_manager_id(manager_id: str, db: Session = Depends(get_db)):
    return PaymentController.getAllPaymentsByManagerId(manager_id, db)