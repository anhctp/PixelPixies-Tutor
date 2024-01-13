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
    def upload_and_marking(img: UploadFile=File(...), db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken), bucket_name="tutor_pdf"):
        path = upload_blob(bucket_name=bucket_name, file=img)
        uri = path["gcs_path"]
        text = detect_document_uri(uri)
        text = text + "\n" + marking_template
        chat_prompts = {"role": "user", "content": text}
        result = get_chat(messages=chat_prompts)
        print(result)
        marking = extract_marking(result)
        print(marking)
        new_marking = MarkingModel(
            user_id = current_user.id,
            img_path = path["path"],
            score = marking['score'],
            comment = marking['comment'],
            advice = marking['advice'],
        )
        db.add(new_marking)
        db.commit()
        db.refresh(new_marking)
        return new_marking