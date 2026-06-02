from fastapi import APIRouter
from pydantic import BaseModel

from services.pinecone_service import (
    search_chunks
)

from services.memory_service import (
    add_message,
    get_history
)

from services.gemini_service import (
    generate_answer
)


router = APIRouter()

class QuestionRequest(
    BaseModel
):
    question: str


@router.post("/ask")
def ask_question(
    payload: QuestionRequest
):

    matches = search_chunks(
        payload.question
    )

    context = "\n".join(
        [
            match.metadata["text"]
            for match in matches
        ]
    )

    if not context.strip():
        return {
            "answer": "No relevant information found in the document for your question."
        }

    history = get_history()[-10:]

    formatted_history = ""
    if history:
        for msg in history:
            formatted_history += f"\n{msg['role'].upper()}: {msg['content']}"
    else:
        formatted_history = "No previous conversation"

    answer = generate_answer(
        context,
        payload.question,
        formatted_history
    )

    add_message(
        "user",
        payload.question
    )

    add_message(
        "assistant",
        answer
    )

    return {
        "answer": answer
    }