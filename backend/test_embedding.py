from dotenv import load_dotenv

load_dotenv()

from services.embedding_service import (
    create_embedding
)

embedding = create_embedding(
    "Hello World"
)

print(
    len(embedding)
)