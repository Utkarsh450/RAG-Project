from services.router_service import (
    route_question
)

from services.agents.document_agent import (
    run as document_run,
    stream as document_stream
)

from services.agents.general_agent import (
    run as general_run,
    stream as general_stream
)
from services.agents.document_meta_agent import (
    run as document_meta_run
)

from services.agents.memory_agent import (
    run as memory_run
)

from services.agents.comparison_agent import (
    run as comparison_run
)

from services.context_service import (
    get_context
)


def process_question(
    question,
    history,
    user_id,
    document_name
):

    route = route_question(
        question,
        document_selected=bool(document_name)
    )

    print(
        f"QUESTION: {question}",
        flush=True
    )

    print(
        f"ROUTE: {route}",
        flush=True
    )

    if route == "document":

        context = get_context(
            question,
            user_id,
            document_name
        )

        if not context.strip():

            return (
                "No relevant information found "
                "in the document."
            )

        return document_run(
            context,
            question,
            history
        )

    elif route == "general":

        return general_run(
            question,
            history
        )

    elif route == "memory":

        return memory_run(
            question,
            history
        )

    elif route == "comparison":

        return comparison_run()

    return general_run(
        question,
        history
    )


def process_question_stream(
    question,
    history,
    user_id,
    document_name
):

    route = route_question(
        question,
        document_selected=bool(document_name)
    )

    print(
        f"QUESTION: {question}",
        flush=True
    )

    print(
        f"ROUTE: {route}",
        flush=True
    )

    if route == "document":

        context = get_context(
            question,
            user_id,
            document_name
        )

        if not context.strip():

            return iter([
                "No relevant information found "
                "in the document."
            ])

        return document_stream(
            context,
            question,
            history
        )

    elif route == "general":

        return general_stream(
            question,
            history
        )

    elif route == "memory":

        return general_stream(
            question,
            history
        )
    elif route == "document_meta":

        return document_meta_run(
            question,
            user_id,
            document_name
    )

    elif route == "comparison":

        return comparison_run(
        question,
        
        user_id
    )

    return general_stream(
        question,
        history
    )