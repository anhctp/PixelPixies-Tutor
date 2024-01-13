from sqlalchemy import Column, Integer, String, ForeignKey
import database

class StepModel(database.Base):
    __tablename__ = "Steps"
    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey("Roadmaps.id"))
    step_number = Column(Integer)
    resource_name = Column(String(100))
    resource_link = Column(String(100))
    task = Column(String(100))
    time = Column(String(20))