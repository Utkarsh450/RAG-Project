from services.document_service import (
    get_documents
)

from services.document_meta_service import (
    generate_document_meta_answer
)


def run(
    question,
    user_id,
    document_name
):

    docs = get_documents(
        user_id
    )

    document_list = "\n".join(
        [
            doc["document_name"]
            for doc in docs
        ]
    )

    return generate_document_meta_answer(
        question,
        document_name,
        document_list
    
    
    
    )