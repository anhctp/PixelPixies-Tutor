from sqlalchemy import Column, Integer, String, ForeignKey
import database

class PDFModel(database.Base):
    __tablename__ = ""
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("Users.id"))
    path = Column(String(100), unique=True)
