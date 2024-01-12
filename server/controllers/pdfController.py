from fastapi import FastAPI, File, UploadFile, Depends
from ai.utils.upload import upload_blob
from sqlalchemy.orm import Session
from database import getDatabase
import os

from models.PDF import PDFModel
from controllers.userController import verifyToken
from models.user import UserModel
from ai.utils.pdf2txt import async_detect_document

class PDFController:
    def upload_pdf(pdf: UploadFile=File(...), db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        file_path = upload_blob(bucket_name="tutor_pdf", file=pdf)
        new_pdf = PDFModel(
            user_id = current_user.id,
            path = file_path
        )
        db.add(new_pdf)
        db.commit()
        db.refresh(new_pdf)
        return "Upload successfull"
    
    def pdf_to_text(pdf_id: int, db: Session = Depends(getDatabase)):
        pdf = db.query(PDFModel).filter(PDFModel.id == pdf_id).first()
        return async_detect_document(gcs_source_uri=pdf.path, )

    