import os

from google import genai

client = genai.Client(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)


def generate_answer(
    context,
    question
):

    prompt = f"""
Answer only from the provided context.

Context:
{context}

Question:
{question}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text