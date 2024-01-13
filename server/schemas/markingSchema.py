from typing import Optional
from pydantic import BaseModel


class MarkingFileSchema(BaseModel):
    question: str
    markingCriteria: Optional[str]


class MarkingSchema(MarkingFileSchema):
    context: Optional[str]
    question: str
    markingCriteria: Optional[str]
