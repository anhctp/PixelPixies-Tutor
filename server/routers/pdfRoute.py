from fastapi import APIRouter, Depends, Response
from controllers.pdfController import PDFController
from sqlalchemy.orm import Session
from database import getDatabase
from fastapi import FastAPI, File, UploadFile
from controllers.userController import verifyToken

from models.user import UserModel
from models.question_list import QuestionType
from schemas.pdfSchema import TextUpload
from schemas.questionSchemas import QuestGen


router = APIRouter(
    tags=["PDF"],
    prefix="/PDF",
    responses={404: {"description": "Not found"}},
)


@router.post("/upload")
def upload_pdf(
    pdf: UploadFile,
    db: Session = Depends(getDatabase),
    current_user: UserModel = Depends(verifyToken),
):
    return PDFController.upload_pdf(pdf=pdf, db=db, current_user=current_user)


@router.post("/upload/text")
def upload_text(
    text: TextUpload,
    db: Session = Depends(getDatabase),
    current_user: UserModel = Depends(verifyToken),
):
    return PDFController.upload_text(text=text.text, db=db, current_user=current_user)


@router.post("/pdf_to_text")
def generate_question(payload: QuestGen, db: Session = Depends(getDatabase)):
    return PDFController.generate_question(
        pdf_id=payload.pdf_id,
        type=payload.type,
        db=db,
        language=payload.language,
        easy=payload.num_easy,
        medium=payload.num_medium,
        hard=payload.num_hard,
    )
