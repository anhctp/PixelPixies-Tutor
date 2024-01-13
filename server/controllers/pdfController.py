from fastapi import FastAPI, File, UploadFile, Depends
from ai.utils.upload import upload_blob
from sqlalchemy.orm import Session
from database import getDatabase
import os
from ai.prompt.gen_ques_prompt import *
from models.PDF import PDFModel
from controllers.userController import verifyToken
from models.user import UserModel
from ai.utils.pdf2txt import async_detect_document
from ai.demo import get_chat
from ai.utils.extract_question import extract_mcq, extract_tfq
from models.question_list import QuestionListModel, QuestionType
from models.MCQ import MCQModel
from models.TF import TFModel
from models.FIB import FIBModel

class PDFController:
    def upload_pdf(pdf: UploadFile=File(...), db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        path = upload_blob(bucket_name="tutor_pdf", file=pdf)
        gcs_source_uri = path['gcs_path']
        gcs_destination_uri = path['gcs_path'][0:-3] + "json"
        full_text = async_detect_document(gcs_source_uri=gcs_source_uri, gcs_destination_uri=gcs_destination_uri)
        new_pdf = PDFModel(
            user_id = current_user.id,
            path = path['path'],
            gcs_path = path['gcs_path'],
            content = full_text
        )
        db.add(new_pdf)
        db.commit()
        db.refresh(new_pdf)
        return "Upload successfull"
    
    def generate_question(
            pdf_id: int, 
            type: QuestionType, 
            db: Session = Depends(getDatabase),
            language: str = "English",
            easy: int = 3,
            medium: int = 3,
            hard: int = 3):
        pdf = db.query(PDFModel).filter(PDFModel.id == pdf_id).first()
        new_question_list = QuestionListModel(
            pdf_id = pdf.id
        )
        db.add(new_question_list)
        db.commit()
        db.refresh(new_question_list)

        if type == QuestionType.MCQ:
            template = mcq_template
        elif type == QuestionType.TF:
            template = tfq_template
        else:
            template = fill_in_blank_template
        template = template.format(language=language, easy_num=easy, med_num=medium, hard_num=hard)
        text = pdf.content + "\n" + template
        chat_prompts = {"role": "user", "content": text}
        question_list = get_chat(messages=chat_prompts)
        print(question_list)
        if type == QuestionType.MCQ:
            extracted_questions = extract_mcq(question_list)
        elif type == QuestionType.TF:
            extracted_questions = extract_tfq(question_list)
        else:
            extracted_questions = extract_tfq(question_list)
        for question in extracted_questions:
            if type == QuestionType.MCQ:
                new_ques = MCQModel(
                    question_list_id=new_question_list.id,
                    question = question["question"],
                    opt1=question["options"][0],
                    opt2=question["options"][1],
                    opt3=question["options"][2],
                    opt4=question["options"][3],
                    true_opt=question["true option"][0]
                )
            elif type == QuestionType.TF:
                if question["answer"] == "True":
                    answer = True
                else:
                    answer = False
                new_ques = TFModel(
                    question_list_id=new_question_list.id,
                    question = question["question"],              
                    answer=answer
                )
            # else:
            #     new_ques = FIBModel(
            #         question_list_id=new_question_list.id,
            #         question = question["question"],
            #         opt1=question["options"][0],
            #         opt2=question["options"][1],
            #         opt3=question["options"][2],
            #         opt4=question["options"][3],
            #         true_opt=question["true option"][0]
            #     )
            db.add(new_ques)
            db.commit()
            db.refresh(new_ques)
        return extracted_questions
        

    