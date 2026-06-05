from services.chains.general_chain import (
    general_chain
)


def generate_general_answer(
    question,
    history,
    documents
):

    return general_chain.invoke(
        {
            "question": question,
            "history": history,
            "documents": documents
        }
    )


def generate_general_answer_stream(
    question,
    history,
    documents
):

    for chunk in general_chain.stream(
        {
            "question": question,
            "history": history,
            "documents": documents
        }
    ):

        yield chunk