from fastapi import (
    APIRouter,
    Depends,
    Query
)
from fastapi.responses import (
    StreamingResponse
)
from services.orchestrator_service import (
    process_question_stream
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

    # matches = search_chunks(
    #     payload.question,
    #     user_id,
    #     payload.document
    # )

    # context = "\n".join(
    #     [
    #         match.metadata["text"]
    #         for match in matches
    #     ]
    # )
        

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

    answer = process_question(
    question=payload.question,
    history=formatted_history,
    user_id=user_id,
    document_name=payload.document
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

    # matches = search_chunks(
    #     payload.question,
    #     user_id,
    #     payload.document
    # )

    # context = "\n".join(
    #     [
    #         match.metadata["text"]
    #         for match in matches
    #     ]
    # )

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
    orchestrator_stream_and_save(
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
def orchestrator_stream_and_save(
    question,
    history,
    user_id,
    document_name
):

    full_answer = ""

    for chunk in process_question_stream(
        question,
        history,
    
        user_id,
        document_name
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



@router.get("/test-llm")
def test_llm():

    from services.langchain_groq_service import (
        generate_answer
    )

    answer = generate_answer(
        "React is a JavaScript library.",
        "What is React?",
        ""
    )

    return {
        "answer": answer
    }
@router.get("/test-router")
def test_router():

    from services.router_service import (
        route_question
    )

    return {
        "route":
        route_question(
            "compare all pdfs"
        )
    
    }
@router.get("/test-orchestrator")
def test_orchestrator():

    from services.orchestrator_service import (
        process_question
    )

    answer = process_question(
        question=
        "What was my previous question?",

        context="",

        history=""
    )

    return {
        "answer": answer
    }