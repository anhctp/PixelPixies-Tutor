from sqlalchemy import Column, Integer, String, ForeignKey, Text
import database


class PDFModel(database.Base):
    __tablename__ = "PDFs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("Users.id", ondelete="CASCADE"))
    path = Column(String(100))
    gcs_path = Column(String(100))
    content = Column(Text, nullable=True)
