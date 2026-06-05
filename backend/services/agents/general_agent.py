from services.general_service import (
    generate_general_answer,
    generate_general_answer_stream
)

from services.document_service import (
    get_documents
)


def run(
    question,
    history,
    user_id
):

    docs = get_documents(
        user_id
    )

    doc_names = "\n".join(
        [
            doc["document_name"]
            for doc in docs
        ]
    )

    return generate_general_answer(
        question,
        history,
        doc_names
    )


def stream(
    question,
    history,
    user_id
):

    docs = get_documents(
        user_id
    )

    doc_names = "\n".join(
        [
            doc["document_name"]
            for doc in docs
        ]
    )

    return generate_general_answer_stream(
        question,
        history,
        doc_names
    )