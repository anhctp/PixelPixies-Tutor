from fastapi import FastAPI, File, UploadFile, Depends
from ai.utils.upload import upload_blob
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.userController import verifyToken
from models.user import UserModel
from ai.prompt.marking_prompt import marking_template
from ai.demo import get_chat
from ai.img2txt import detect_document_uri
from ai.utils.extract_marking import extract_marking
from models.marking import MarkingModel


class MarkingController:
    def upload_and_marking(
        file: UploadFile = File(...),
        question: str = "",
        markingCriteria: str = "",
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
        bucket_name="tutor_pdf",
    ):
        text = f"""
            Question: 
                {question}
            Marking criterial:
                {markingCriteria}
            Answer: 
                
            """
        path = upload_blob(bucket_name=bucket_name, file=file)
        uri = path["gcs_path"]
        text = text + detect_document_uri(uri) + "\n" + marking_template
        chat_prompts = {"role": "user", "content": text}
        result = get_chat(messages=chat_prompts)
        print(result)
        marking = extract_marking(result)
        print(marking)
        new_marking = MarkingModel(
            user_id=current_user.id,
            img_path=path["path"],
            score=marking["score"],
            comment=marking["comment"],
            advice=marking["advice"],
        )
        db.add(new_marking)
        db.commit()
        db.refresh(new_marking)
        return new_marking

    def upload_and_marking_context(
        context: str = "",
        question: str = "",
        markingCriteria: str = "",
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        text = f"""
            Question: 
                {question}
            Marking criterial:
                {markingCriteria}
            Answer: 
                
            """

        text = text + context + "\n" + marking_template
        chat_prompts = {"role": "user", "content": text}
        result = get_chat(messages=chat_prompts)
        print(result)
        marking = extract_marking(result)
        print(marking)
        new_marking = MarkingModel(
            user_id=current_user.id,
            img_path=context,
            score=marking["score"],
            comment=marking["comment"],
            advice=marking["advice"],
        )
        db.add(new_marking)
        db.commit()
        db.refresh(new_marking)
        return new_marking
