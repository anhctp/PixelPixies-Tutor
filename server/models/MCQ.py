import enum
from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Text
import database


class QuestionDifficulty(str, enum.Enum):
    EASY = "Easy"
    MEDIUM = "Return"
    HARD = "Hard"


class MCQModel(database.Base):
    __tablename__ = "MCQs"
    id = Column(Integer, primary_key=True, index=True)
    question_list_id = Column(Integer, ForeignKey("Question_lists.id"))
    question = Column(Text)
    opt1 = Column(Text)
    opt2 = Column(Text)
    opt3 = Column(Text)
    opt4 = Column(Text)
    true_opt = Column(Text)
