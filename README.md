# PixelPixies-Tutor

## Contributors
- Cao Thị Phương Anh
- Nguyễn Thị Thanh Thuỷ

## Introduction
PixelPixies - Smart Tutor for self-learner
Features:
- Creating roadmap and schedule based on learning field and time.
- Grading and giving feedback for exercises
- Generate question (multiple choice question, true false question) from file
- Inquiring the file

## Demo
PixelPixies Tutor [https://www.youtube.com/watch?v=APjI5BKvDf0]

## Technology
- Frontent: NextJS
- Backend: FastAPI
- Database: MySQL
- Asure OpenAI
- Google Cloud Vision AI

## Quickstart
```bash
# clone project
git clone https://github.com/ctpanh/PixelPixies-Tutor
cd PixelPixies-Tutor

# Run backend
cd server
pip install -r requirements.txt
uvicorn main:app -reload

# Run frontend
cd client
npm install
npm run dev
```
