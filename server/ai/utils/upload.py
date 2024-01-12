import io
import os
import tempfile
from google.cloud import storage
import json

def upload_blob(bucket_name, file):
    """Uploads a file to the bucket."""
    # Initialize the storage client
    storage_client = storage.Client.from_service_account_json(
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"])  # replace with the path to your JSON credentials
    bucket = storage_client.bucket(bucket_name)

    file.file.seek(0)

    # Upload the PDF file to the bucket using io.BytesIO
    blob = bucket.blob(file.filename)
    blob.upload_from_file(io.BytesIO(file.file.read()), content_type='application/pdf')

    print("File uploaded successfully!")
    return f'https://storage.cloud.google.com/{bucket_name}/{file.filename}'

def delete_file(bucket_name, file_name):
    # Set up Google Cloud Storage client
    storage_client = storage.Client.from_service_account_json(
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"])
    
    # Get the bucket
    bucket = storage_client.bucket(bucket_name)

    # Get the blob (file) from the bucket
    blob = bucket.blob(file_name)

    # Delete the file
    blob.delete()

    return "File deleted successfully!"
