from services.pinecone_service import (
    search_chunks
)


def retrieve_context(
    question,
    user_id,
    document_name
):

    matches = search_chunks(
        question,
        user_id,
        document_name
    )

    context = "\n".join(
        [
            match.metadata["text"]
            for match in matches
        ]
    )

    return context