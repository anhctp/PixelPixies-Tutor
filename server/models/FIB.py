from sqlalchemy import Column, Integer, String, ForeignKey
import database

class FIBModel(database.Base):
    __tablename__ = "FIBs"
    id = Column(Integer, primary_key=True, index=True)
    question_list_id = Column(Integer, ForeignKey("Question_lists.id", ondelete="CASCADE"))
    question = Column(String(500))
    answer = Column(String(100))
    
