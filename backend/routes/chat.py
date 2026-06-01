from fastapi import APIRouter
from pydantic import BaseModel

from services.pinecone_service import (
    search_chunks
)

from services.groq_service import (
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
            match["metadata"]["text"]
            for match in matches
        ]
    )

    answer = generate_answer(
        context,
        payload.question
    )

    return {
        "answer": answer
    }