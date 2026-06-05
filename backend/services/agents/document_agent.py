from services.langchain_rag_service import (
    generate_answer,
    generate_answer_stream
)


def run(
    context,
    question,
    history
):

    return generate_answer(
        context,
        question,
        history
    )


def stream(
    context,
    question,
    history
):

    return generate_answer_stream(
        context,
        question,
        history
    )