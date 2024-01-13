import enum
from sqlalchemy import Column, Integer, String, ForeignKey, Enum
import database

class QuestionDifficulty(str, enum.Enum):
    EASY = "Easy"
    MEDIUM = "Return"
    HARD = "Hard"

class MCQModel(database.Base):
    __tablename__ = "MCQs"
    id = Column(Integer, primary_key=True, index=True)
    question_list_id = Column(Integer, ForeignKey("Question_lists.id"))
    question = Column(String(500))
    opt1 = Column(String(100))
    opt2 = Column(String(100))
    opt3 = Column(String(100))
    opt4 = Column(String(100))
    true_opt = Column(String(100))
