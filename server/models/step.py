from sqlalchemy import Column, Integer, String, ForeignKey, Text
import database


class StepModel(database.Base):
    __tablename__ = "Steps"
    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey("Roadmaps.id"))
    step_number = Column(Integer)
    resource_name = Column(Text)
    resource_link = Column(Text)
    task = Column(Text)
    time = Column(Text)
