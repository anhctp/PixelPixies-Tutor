from sqlalchemy import Column, Integer, String, ForeignKey, Text
import database


class MarkingModel(database.Base):
    __tablename__ = "Markings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("Users.id", ondelete="CASCADE"))
    img_path = Column(Text)
    score = Column(Integer)
    comment = Column(String(500))
    advice = Column(String(500))
