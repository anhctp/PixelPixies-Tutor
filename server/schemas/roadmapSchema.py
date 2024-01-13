from pydantic import BaseModel


class CreateRoadmap(BaseModel):
    topic: str
    time: int
