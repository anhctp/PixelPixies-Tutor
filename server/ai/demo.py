import time
from openai import AzureOpenAI
import openai


AZURE_OPENAI_ENDPOINT = "https://sunhackathon20.openai.azure.com/"
AZURE_OPENAI_KEY = "bbd558e31b164b7898dcfe1f5579c041"
client = AzureOpenAI(
    azure_endpoint=AZURE_OPENAI_ENDPOINT,
    api_key=AZURE_OPENAI_KEY,
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
    response = openai.Embedding.create(
        input=message,
        engine=engine
    )
    embeddings = response['data'][0]['embedding']
    print(embeddings)
    return response

def get_chat(messages: dict, engine="gpt-35-turbo",):
    # response = openai.ChatCompletion.create(
    response = client.chat.completions.create(
        model="GPT35TURBO",# replace this value with the deployment name you chose when you deployed the associated model.
        messages = [{"role":"system","content":"You are an tutor whose primary goal is to generate question for student to understand the document."},
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
