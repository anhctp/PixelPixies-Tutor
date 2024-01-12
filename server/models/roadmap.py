from sqlalchemy import Column, Integer, String, ForeignKey
import database

class RoadMapModel(database.Base):
    __tablename__ = "Roadmaps"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("Users.id"))
    months = Column(Integer)