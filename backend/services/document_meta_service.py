from services.chains.document_meta_chain import (
    document_meta_chain
)


def generate_document_meta_answer(
    question,
    current_document,
    documents
):

    return document_meta_chain.invoke(
        {
            "question": question,
            "current_document": current_document,
            "documents": documents
        }
    )