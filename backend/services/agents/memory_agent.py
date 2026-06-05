from services.general_service import (
    generate_general_answer
)


def run(
    question,
    history
):

    prompt = f"""
Conversation History:

{history}

User Question:
{question}

Answer ONLY using the conversation history.
If the answer is not present in the history, say so.
"""

    return generate_general_answer(
        prompt
    )