from fastapi import FastAPI, File, UploadFile, Depends
from ai.utils.upload import upload_blob
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.userController import verifyToken
from models.user import UserModel
from ai.prompt.marking_prompt import marking_template
from ai.demo import get_chat
from ai.img2txt import detect_document_uri
from ai.utils.extract_roadmap import extract_roadmap
from models.marking import MarkingModel
from ai.prompt.roadmap_prompt import roadmap_template

class RoadMapController:
    def create_roadmap(topic: str, time: int, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        template = roadmap_template.format(
            topic=topic, time=time
        )
        chat_prompts = {"role": "user", "content": template}
        roadmap = get_chat(messages=chat_prompts)
        print(roadmap)
        result = extract_roadmap(roadmap)
        return result