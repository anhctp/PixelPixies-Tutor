from sqlalchemy import Column, Integer, String, ForeignKey, Text
import database


class ConversationModel(database.Base):
    __tablename__ = "conversations"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("Users.id", ondelete="CASCADE"))
    path = Column(String(100))
