from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.userController import verifyToken
from models.MCQ import MCQModel
from models.PDF import PDFModel
from models.TF import TFModel
from models.question_list import QuestionListModel
from models.user import UserModel
from sqlalchemy.orm import aliased


class QuestionController:
    def get_question_list_by_user(
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        pdf_alias = aliased(PDFModel)
        question_lists_and_pdfs = (
            db.query(
                QuestionListModel.id,
                QuestionListModel.pdf_id,
                pdf_alias.content.label("content"),
                pdf_alias.path.label("path"),
            )
            .join(PDFModel, PDFModel.id == QuestionListModel.pdf_id)
            .filter(PDFModel.user_id == current_user.id)
            .all()
        )
        result = []
        for items in question_lists_and_pdfs:
            temp = {
                "id": items.id,
                "pdf_id": items.pdf_id,
                "content": items.content,
                "path": items.path,
            }
            result.append(temp)
        if not question_lists_and_pdfs:
            raise HTTPException(status_code=404, detail="User not found")
        return result

    def get_questions_by_list(
        list_id: int,
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        mcq = db.query(MCQModel).filter(MCQModel.question_list_id == list_id).all()
        tf = db.query(TFModel).filter(TFModel.question_list_id == list_id).all()
        return {"mcq": mcq, "tf": tf}

    def delete_question(
        quest_id: int,
        db: Session = Depends(getDatabase),
    ):
        question = (
            db.query(QuestionListModel).filter(QuestionListModel.id == quest_id).first()
        )
        db.delete(question)
        db.commit()
        return {"msg": "Deleted"}
