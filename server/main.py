from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from ai.demo import get_chat_completion_stream
from database import Base, engine
from routers import (
    demo,
    userRoute,
    pdfRoute,
    markingRoute,
    roadmapRoute,
    questionRoute,
    conversationRoute,
)

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.include_router(demo.router)
app.include_router(userRoute.router)
app.include_router(pdfRoute.router)
app.include_router(markingRoute.router)
app.include_router(roadmapRoute.router)
app.include_router(questionRoute.router)
app.include_router(conversationRoute.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "sentry-trace", "baggage"],
)


@app.get("/api/ping")
def ping():
    return "pong"


# conversation = [{"role": "system", "content": "You are a helpful assistant."}]


# @app.post("/chat")
# async def chat(user_input: str = Form(...)):
#     global conversation
#     print(conversation)

#     conversation.append({"role": "user", "content": user_input})

#     return get_chat_completion_stream(messages=conversation)
