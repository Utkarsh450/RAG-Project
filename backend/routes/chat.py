from fastapi import (
    APIRouter,
    Depends
)

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

from services.current_user_service import (
    get_current_user
)

router = APIRouter()


class QuestionRequest(
    BaseModel
):
    question: str
    document: str


@router.post("/ask")
def ask_question(
    payload: QuestionRequest,
    current_user=Depends(
        get_current_user
    )
):

    user_id = str(
        current_user["_id"]
    )

    matches = search_chunks(
        payload.question,
        user_id,
        payload.document
    )

    context = "\n".join(
        [
            match.metadata["text"]
            for match in matches
        ]
    )

    if not context.strip():
        return {
            "answer":
            "No relevant information found in the document for your question."
        }

    history = get_history(
        user_id
    )[-10:]

    formatted_history = ""

    if history:

        for msg in history:

            formatted_history += (
                f"\n{msg['role'].upper()}: "
                f"{msg['content']}"
            )

    else:

        formatted_history = (
            "No previous conversation"
        )

    answer = generate_answer(
        context,
        payload.question,
        formatted_history
    )

    add_message(
        user_id,
        "user",
        payload.question
    )

    add_message(
        user_id,
        "assistant",
        answer
    )

    return {
        "answer": answer
    }