from fastapi import APIRouter, Depends, Response
from controllers.markingController import MarkingController
from sqlalchemy.orm import Session
from database import getDatabase
from fastapi import FastAPI, File, UploadFile
from controllers.userController import verifyToken

from models.user import UserModel
from models.question_list import QuestionType
from controllers.pdfController import PDFController


router = APIRouter(
    tags=["Marking"],
    prefix="/Marking",
    responses={404: {"description": "Not found"}},
)

@router.post("/upload")
def upload_and_marking(img: UploadFile, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return MarkingController.upload_and_marking(img=img, db=db, current_user=current_user)