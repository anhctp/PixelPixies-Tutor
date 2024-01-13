from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text
import database


class TFModel(database.Base):
    __tablename__ = "TFs"
    id = Column(Integer, primary_key=True, index=True)
    question_list_id = Column(Integer, ForeignKey("Question_lists.id"))
    question = Column(Text)
    answer = Column(Boolean)
