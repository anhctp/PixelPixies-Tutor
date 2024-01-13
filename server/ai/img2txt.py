import os
from google.oauth2 import service_account
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from msrest.authentication import CognitiveServicesCredentials

import time


def detect_document(path):
    """Detects document features in an image."""
    from google.cloud import vision

    credentials = service_account.Credentials.from_service_account_file(os.environ["GOOGLE_APPLICATION_CREDENTIALS"])

    client = vision.ImageAnnotatorClient(credentials=credentials)

    with open(path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.document_text_detection(image=image)

    result = ""

    for page in response.full_text_annotation.pages:
        for block in page.blocks:
            # print(f"\nBlock confidence: {block.confidence}\n")

            for paragraph in block.paragraphs:
                # print("Paragraph confidence: {}".format(paragraph.confidence))

                for word in paragraph.words:
                    word_text = "".join([symbol.text for symbol in word.symbols])
                    print(
                        "Word text: {} (confidence: {})".format(
                            word_text, word.confidence
                        )
                    )
                    result += " " + word_text


    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )
    return result

def img_to_txt(image_file):
    credentials = service_account.Credentials.from_service_account_file(os.environ["GOOGLE_APPLICATION_CREDENTIALS"])
    endpoint = "https://sunhackathon20.openai.azure.com/"
    key = "bbd558e31b164b7898dcfe1f5579c041"
    computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(key))

    # Open local image file
    with open(image_file, "rb") as image:
        # Call the API
        read_response = computervision_client.read_in_stream(image, raw=True)
    # Get the operation location (URL with an ID at the end)
    read_operation_location = read_response.headers["Operation-Location"]
    # Grab the ID from the URL
    operation_id = read_operation_location.split("/")[-1]
    # Retrieve the results 
    while True:
        read_result = computervision_client.get_read_result(operation_id)
        if read_result.status.lower() not in ['notstarted', 'running']:
            break
        time.sleep(1)
    # Get the detected text
    if read_result.status == OperationStatusCodes.succeeded:
        for page in read_result.analyze_result.read_results:
            for line in page.lines:
                # Print line
                print(line.text)

text = detect_document("/Users/thuy/Downloads/Work/PixelPixies-Tutor/server/ai/handwritten.png")
print(text)