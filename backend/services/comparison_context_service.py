from services.document_service import (
    get_documents
)
from langsmith import traceable

from services.pinecone_service import (
    get_document_chunks
)

@traceable
def get_comparison_context(
    question,
    user_id
):

    documents = get_documents(
        user_id
    )

    print(
        "DOCUMENTS:",
        documents,
        flush=True
    )

    contexts = []

    for doc in documents:

        document_name = doc[
            "document_name"
        ]

        matches = get_document_chunks(
            user_id,
            document_name
        )

        print(
            f"{document_name}: {len(matches)} chunks",
            flush=True
        )

        context = "\n".join(
            [
                match.metadata["text"]
                for match in matches
            ]
        )

        contexts.append(
            f"""
DOCUMENT:
{document_name}

CONTENT:
{context}
"""
        )

    return "\n\n".join(
        contexts
    )