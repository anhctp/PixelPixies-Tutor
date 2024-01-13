import enum
from sqlalchemy import Column, Integer, String, ForeignKey
import database

class QuestionType(str, enum.Enum):
    MCQ = "Multiple choice Question"
    TF = "True False Question"
    # FIB = "Fill in blank Question"


class QuestionListModel(database.Base):
    __tablename__ = "Question_lists"
    id = Column(Integer, primary_key=True, index=True)
    pdf_id = Column(Integer, ForeignKey("PDFs.id"))
