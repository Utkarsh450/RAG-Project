from dotenv import load_dotenv

load_dotenv()

from services.pinecone_service import (
    store_chunks,
    search_chunks
)

chunks = [
    "Employees get 20 paid leaves annually.",
    "Company provides medical insurance.",
]

store_chunks(chunks)

results = search_chunks(
    "How many paid leaves are available?"
)

print(results)