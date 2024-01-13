from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers.questionController import QuestionController
from database import getDatabase
from controllers.userController import verifyToken

from models.user import UserModel


router = APIRouter(
    tags=["Questions"],
    prefix="/question",
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def get_question_list_by_user(
    db: Session = Depends(getDatabase),
    current_user: UserModel = Depends(verifyToken),
):
    return QuestionController.get_question_list_by_user(
        db=db, current_user=current_user
    )


@router.get("/list/{list_id}")
def get_questions_by_list(
    list_id: int,
    db: Session = Depends(getDatabase),
    current_user: UserModel = Depends(verifyToken),
):
    return QuestionController.get_questions_by_list(
        list_id=list_id, db=db, current_user=current_user
    )


@router.delete("/{quest_id}")
def delete_quest_list(
    quest_id: int,
    db: Session = Depends(getDatabase),
):
    return QuestionController.delete_question(quest_id=quest_id, db=db)
