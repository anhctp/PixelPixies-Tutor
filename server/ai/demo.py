from openai import AzureOpenAI

AZURE_OPENAI_ENDPOINT = "https://sunhackathon20.openai.azure.com/"
AZURE_OPENAI_KEY = "bbd558e31b164b7898dcfe1f5579c041"
client = AzureOpenAI(
    azure_endpoint=AZURE_OPENAI_ENDPOINT,
    api_key=AZURE_OPENAI_KEY,
    api_version="2023-05-15",
)

response_stream = client.chat.completions.create(
    model="GPT35TURBO",
    messages=[
        {"role": "system", "content": "You are a Japanese teacher."},
        {
            "role": "user",
            "content": "Give me resources and instruction to learn Japanese in 6 months",
        },
    ],
    stream=True,
)

for response in response_stream:
    print(response["choices"][0]["message"]["content"])
