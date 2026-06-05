from services.chains.general_chain import (
    general_chain
)


def generate_general_answer(
    question,
    history
):

    return general_chain.invoke(
        {
            "question": question,
            "history": history
        }
    )


def generate_general_answer_stream(
    question,
    history 
):

    for chunk in general_chain.stream(
        {
            "question": question,
            "history": history
        }
    ):

        yield chunk