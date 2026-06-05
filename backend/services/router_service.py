from langsmith import traceable

from services.chains.router_chain import (
    router_chain
)
from langsmith import traceable


@traceable
def route_question(
    question,
    document_selected
):

    route = router_chain.invoke(
        {
            "question": question,
            "document_selected":
            str(document_selected).lower()
        }
    )

    return route.strip().lower()