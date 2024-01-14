from datetime import datetime
import json
from fastapi import File, HTTPException, UploadFile, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from database import getDatabase
from ai.prompt.gen_ques_prompt import *
from controllers.userController import verifyToken
from models.conversation import ConversationModel
from models.user import UserModel
from ai.demo import get_chat_completion_stream
from routers.pdfRoute import upload_pdf


class ConverationController:
    def create_chat_file(
        file: UploadFile = File(...),
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        pdf = upload_pdf(file=file, db=db, current_user=current_user)
        content = pdf.content
        conversation = [
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": f"""You are provided with the content of the document, based on that document, give appropriate answers.
                    The content of the document:
                        {content}
                """,
            },
        ]
        file_path = f"json/data{datetime.now().time()}.json"
        with open(file_path, "w") as json_file:
            json.dump(conversation, json_file)

        newConversation = ConversationModel(user_id=current_user.id, path=file_path)
        db.add(newConversation)
        db.commit()
        db.refresh(newConversation)
        return newConversation

    def get_all_chat(
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        return (
            db.query(ConversationModel)
            .filter(ConversationModel.user_id == current_user.id)
            .all()
        )

    def create_chat_text(
        content: str = "",
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        conversation = [
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": f"""You are provided with the content of the document, based on that document, give appropriate answers.
                    The content of the document:
                        {content}
                """,
            },
        ]
        file_path = f"json/data{datetime.now().time()}.json"
        with open(file_path, "w") as json_file:
            json.dump(conversation, json_file)

        newConversation = ConversationModel(user_id=current_user.id, path=file_path)
        db.add(newConversation)
        db.commit()
        db.refresh(newConversation)
        return newConversation

    def chat(
        chatId: int,
        content: str,
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        chat = (
            db.query(ConversationModel).filter(ConversationModel.id == chatId).first()
        )
        if not chat:
            raise HTTPException(status_code=404, detail=f"Not exist!")

        return StreamingResponse(
            get_chat_completion_stream(filePath=chat.path, message=content),
            media_type="text/event-stream",
        )

    def getChat(
        chatId: int,
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        chat = (
            db.query(ConversationModel).filter(ConversationModel.id == chatId).first()
        )
        if not chat:
            raise HTTPException(status_code=404, detail=f"Not exist!")
        with open(chat.path, "r") as json_file:
            conversation = json.load(json_file)

        return conversation
