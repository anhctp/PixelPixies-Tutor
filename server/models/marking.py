from sqlalchemy import Column, Integer, String, ForeignKey
import database

class MarkingModel(database.Base):
    __tablename__ = "Markings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("Users.id"))
    img_path = Column(String(100))
    score = Column(Integer)
    comment = Column(String(500))
    advice = Column(String(500))