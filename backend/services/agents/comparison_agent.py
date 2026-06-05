from services.comparison_context_service import (
    get_comparison_context
)

from services.comparison_service import (
    generate_comparison
)


def run(
    question,
    user_id
):

    context = (
        get_comparison_context(
            question,
            user_id
        )
    )

    return generate_comparison(
        context,
        question
    )