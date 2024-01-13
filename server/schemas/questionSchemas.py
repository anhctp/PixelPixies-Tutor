from pydantic import BaseModel
from models.question_list import QuestionType


class QuestGen(BaseModel):
    pdf_id: int
    type: QuestionType
    language: str
    num_easy: int
    num_medium: int
    num_hard: int
