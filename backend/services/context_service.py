from services.pinecone_service import (
    search_chunks
)
from langsmith import traceable

@traceable
def get_context(
    question,
    user_id,
    document_name
):
    print(
        "PINECONE CALLED",
        flush=True
    )

    matches = search_chunks(
        question,
        user_id,
        document_name
    )

    return "\n".join(
        [
            match.metadata["text"]
            for match in matches
        ]
    )