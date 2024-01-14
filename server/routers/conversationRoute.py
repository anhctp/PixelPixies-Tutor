from fastapi import APIRouter, Depends
from controllers.conversationController import ConverationController
from sqlalchemy.orm import Session
from database import getDatabase
from fastapi import UploadFile
from controllers.userController import verifyToken

from models.user import UserModel
from schemas.conversationSchema import Chat, TextUpload


router = APIRouter(
    tags=["Conversation"],
    prefix="/conversation",
    responses={404: {"description": "Not found"}},
)


@router.post("/chat-with-file")
def create_chat_with_file(
    file: UploadFile,
    db: Session = Depends(getDatabase),
    current_user: UserModel = Depends(verifyToken),
):
    return ConverationController.create_chat_file(
        file=file, db=db, current_user=current_user
    )


@router.post("/chat-with-text")
def create_chat_with_text(
    user_input: TextUpload,
    db: Session = Depends(getDatabase),
    current_user: UserModel = Depends(verifyToken),
):
    return ConverationController.create_chat_text(
        content=user_input.user_input, db=db, current_user=current_user
    )


@router.post("/chat")
def chat(
    payload: Chat,
    db: Session = Depends(getDatabase),
    current_user: UserModel = Depends(verifyToken),
):
    return ConverationController.chat(
        chatId=payload.conversation_id,
        content=payload.user_input,
        db=db,
        current_user=current_user,
    )


@router.get("/chat/{chat_id}")
def chat(
    chat_id: int,
    db: Session = Depends(getDatabase),
    current_user: UserModel = Depends(verifyToken),
):
    return ConverationController.getChat(
        chatId=chat_id,
        db=db,
        current_user=current_user,
    )
