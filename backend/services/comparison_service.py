from services.chains.comparison_chain import (
    comparison_chain
)


def generate_comparison(
    context,
    question
):

    return comparison_chain.invoke(
        {
            "context": context,
            "question": question
        }
    )