from fastapi.responses import StreamingResponse
from fastapi import APIRouter
from ai.demo import get_chat_completion_stream


router = APIRouter(prefix="/api/openai", tags=["openai"])


@router.post("/gpt")
async def ask_gpt(text: str):
    chat_prompts = {"role": "user", "content": text}
    return StreamingResponse(
        get_chat_completion_stream(chat_prompts),
        media_type="text/event-stream",
    )
