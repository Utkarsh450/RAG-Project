import os
import uuid

from pinecone import Pinecone

from services.embedding_service import (
    create_embedding
)

pc = Pinecone(
    api_key=os.getenv(
        "PINECONE_API_KEY"
    )
)

index = pc.Index(
    os.getenv(
        "PINECONE_INDEX_NAME"
    )
)


def store_chunks(
    chunks,
    document_name
):

    vectors = []

    for i, chunk in enumerate(chunks):

        embedding = create_embedding(
            chunk
        )

        if not embedding:
            continue

        vectors.append(
            {
                "id":
                f"{document_name}-{uuid.uuid4()}",

                "values": embedding,

                "metadata": {
                    "text": chunk,
                    "document": document_name
                }
            }
        )

    index.upsert(
        vectors=vectors
    )

    return True


def search_chunks(
    question,
    document_name=None
):

    question_embedding = (
        create_embedding(question)
    )

    query_params = {
        "vector":
        question_embedding,

        "top_k": 5,

        "include_metadata": True
    }

    if document_name:

        query_params["filter"] = {
            "document":
            document_name
        }

    results = index.query(
        **query_params
    )

    return results.matches