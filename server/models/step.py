from sqlalchemy import Column, Integer, String, ForeignKey
import database

class StepModel(database.Base):
    __tablename__ = "Steps"
    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey("Roadmaps.id"))
    months = Column(Integer)
    content = Column(String(50))
    path = Column(String(50))
