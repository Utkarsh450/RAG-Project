from services.chains.rag_chain import (
    rag_chain
)


def generate_answer(
    context,
    question,
    history
):

    return rag_chain.invoke(
        {
            "context": context,
            "question": question,
            "history": history
        }
    )


def generate_answer_stream(
    context,
    question,
    history
):

    for chunk in rag_chain.stream(
        {
            "context": context,
            "question": question,
            "history": history
        }
    ):

        yield chunk