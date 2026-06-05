from services.llms.groq_llm import (
    llm
)

from services.prompts.document_prompt import (
    document_prompt
)


def generate_answer(
    context,
    question,
    history
):

    prompt = document_prompt.format(
    context=context,
    question=question,
    history=history
)

    response = llm.invoke(
        prompt
    )

    return response.content


def generate_answer_stream(
    context,
    question,
    history
):

    prompt = document_prompt.format(
    context=context,
    question=question,
    history=history
)

    for chunk in llm.stream(
        prompt
    ):

        if chunk.content:
            print(
            "CHUNK:",
            chunk.content,
            flush=True
        )

            yield chunk.content