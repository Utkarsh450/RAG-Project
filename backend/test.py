from dotenv import load_dotenv
import os

load_dotenv()

print(
    os.getenv(
        "PINECONE_INDEX_NAME"
    )
)