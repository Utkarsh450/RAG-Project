from services.general_service import (
    generate_general_answer,
    generate_general_answer_stream
)


def run(
    question,
    history
):

    return generate_general_answer(
        question,
        history
    )


def stream(
    question,
    history
):

    return generate_general_answer_stream(
        question,
        history
    )