from pydantic import BaseModel


class PDFCreate:
    path: str


class TextUpload(BaseModel):
    text: str
