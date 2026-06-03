from fastapi import (
    APIRouter,
    Depends,
    Query
)
from fastapi.responses import (
    StreamingResponse
)
from services.gemini_service import (
    generate_answer,
    generate_answer_stream
)

from pydantic import BaseModel

from services.pinecone_service import (
    search_chunks
)

from services.memory_service import (
    add_message,
    get_history
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
        user_id,
        payload.document
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
        payload.document,
        "user",
        payload.question
    )

    add_message(
        user_id,
        payload.document,
        "assistant",
        answer
    )

    return {
        "answer": answer
    
    }
    
@router.post("/ask-stream")
def ask_stream(
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

        return StreamingResponse(
            iter([
                "No relevant information found in the document for your question."
            ]),
            media_type="text/event-stream"
        )

    history = get_history(
        user_id,
        payload.document
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

    return StreamingResponse(
    stream_and_save(
        context,
        payload.question,
        formatted_history,
        user_id,
        payload.document
    ),
    media_type=
    "text/event-stream"
)
    
def stream_and_save(
    context,
    question,
    history,
    user_id,
    document_name
):

    full_answer = ""

    for chunk in generate_answer_stream(
        context,
        question,
        history
    ):

        full_answer += chunk

        yield chunk

    add_message(
        user_id,
        document_name,
        "user",
        question
    )

    add_message(
        user_id,
        document_name,
        "assistant",
        full_answer
    
    )
@router.get("/chat-history")
def chat_history(
    document: str,
    current_user=Depends(
        get_current_user
    )
):

    user_id = str(
        current_user["_id"]
    )

    print("DOCUMENT:", document)
    print("USER:", user_id)

    history = get_history(
        user_id,
        document
    )

    print("HISTORY:", history)

    return history