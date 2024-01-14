from pydantic import BaseModel


class TextUpload(BaseModel):
    user_input: str


class Chat(TextUpload):
    conversation_id: int
