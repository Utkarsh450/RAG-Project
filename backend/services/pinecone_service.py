import os

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


def store_chunks(chunks):


    vectors = []
    for i, chunk in enumerate(chunks):

        embedding = create_embedding(
            chunk
        )

        vectors.append(
            {
                "id": f"chunk-{i}-{hash(chunk)}",
                "values": embedding,
                "metadata": {
                    "text": chunk
                }
            }
        )

    index.upsert(
        vectors=vectors
    )

    return True


def search_chunks(question):

    question_embedding = (
        create_embedding(question)
    )

    results = index.query(
        vector=question_embedding,
        top_k=5,
        include_metadata=True
    )

    return results.matches