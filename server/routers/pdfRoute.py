from fastapi import APIRouter, Depends, Response
from controllers.pdfController import PDFController
from sqlalchemy.orm import Session
from database import getDatabase
from fastapi import FastAPI, File, UploadFile
from controllers.userController import verifyToken

from models.user import UserModel


router = APIRouter(
    tags=["PDF"],
    prefix="/PDF",
    responses={404: {"description": "Not found"}},
)

@router.post("/upload")
def upload_pdf(pdf: UploadFile, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return PDFController.upload_pdf(pdf=pdf, db=db, current_user=current_user)

