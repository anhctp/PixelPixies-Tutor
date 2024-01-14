import os
import time
from openai import AzureOpenAI
import openai
from dotenv import load_dotenv

load_dotenv()

client = AzureOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    api_version="2023-05-15",
)

# response_stream = client.chat.completions.create(
#     model="GPT35TURBO",
#     messages=[
#         {"role": "system", "content": "You are a Japanese teacher."},
#         {
#             "role": "user",
#             "content": "Give me resources and instruction to learn Japanese in 6 months",
#         },
#     ],
#     stream=True,
# )

# for response in response_stream:
#     print(response["choices"][0]["message"]["content"])


def embedding(message: str, engine="gpt-35-turbo"):
    response = openai.Embedding.create(input=message, engine=engine)
    embeddings = response["data"][0]["embedding"]
    print(embeddings)
    return response


def get_chat(messages: dict, engine="gpt-35-turbo", type="generate_question"):
    # response = openai.ChatCompletion.create(
    if type == "generate_question":
        content = "You are an tutor whose primary goal is to generate question for student to understand the document."
    elif type == "marking":
        content = "You are an tutor whose primary goal is to grade student's exercise and correct it."
    else:
        content = "You are an tutor whose primary goal is to create a roadmap for student to learn new topic."
    response = client.chat.completions.create(
        model="GPT35TURBO16K",  # replace this value with the deployment name you chose when you deployed the associated model.
        messages=[
            {"role": "system", "content": content},
            messages,
        ],
    )
    return response.choices[0].message.content


def get_chat_completion_stream(
    messages: dict,
    engine="gpt-35-turbo",
) -> str:
    res = client.chat.completions.create(
        model="GPT35TURBO",
        messages=[
            {"role": "system", "content": "You are a Japanese teacher."},
            messages,
        ],
        stream=True,
    )
    start_time = time.time()
    for event in res:
        if event.choices[0].delta.content:
            current_response = event.choices[0].delta.content
            res_time = time.time() - start_time
            print(f"response :{current_response}, time: {res_time}")
            yield "data: " + current_response + "\n\n"


def get_chat_completion_stream(
    messages: dict,
    engine="GPT35TURBO",
) -> str:
    res = client.chat.completions.create(
        model=engine,
        messages=messages,
        stream=True,
    )
    result_string = ""
    for event in res:
        if event.choices[0].delta.content:
            current_response = event.choices[0].delta.content
            print(current_response)
            yield current_response
            result_string += current_response
    messages.append({"role": "assistant", "content": result_string})
