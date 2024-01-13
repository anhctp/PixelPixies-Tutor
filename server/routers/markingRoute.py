import json
from typing import Optional
from fastapi import APIRouter, Depends, Response
from controllers.markingController import MarkingController
from sqlalchemy.orm import Session
from database import getDatabase
from fastapi import FastAPI, File, UploadFile, Form
from controllers.userController import verifyToken

from models.user import UserModel
from models.question_list import QuestionType
from controllers.pdfController import PDFController
from schemas.markingSchema import MarkingFileSchema, MarkingSchema


router = APIRouter(
    tags=["Marking"],
    prefix="/marking",
    responses={404: {"description": "Not found"}},
)


@router.post("/upload-file")
def upload_and_marking_file(
    file: UploadFile,
    question: str = Form(...),
    markingCriteria: str = Form(...),
    db: Session = Depends(getDatabase),
    current_user: UserModel = Depends(verifyToken),
):
    return MarkingController.upload_and_marking(
        file=file,
        question=question,
        markingCriteria=markingCriteria,
        db=db,
        current_user=current_user,
    )


@router.post("/upload-context")
def upload_and_marking_file(
    payload: MarkingSchema,
    db: Session = Depends(getDatabase),
    current_user: UserModel = Depends(verifyToken),
):
    return MarkingController.upload_and_marking_context(
        question=payload.question,
        markingCriteria=payload.markingCriteria,
        db=db,
        current_user=current_user,
    )
