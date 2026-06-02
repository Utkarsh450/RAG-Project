import os

from groq import Groq

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_answer(
    context,
    question
):

 prompt = f"""
You are a helpful document assistant.

Use only the provided context.

If the answer is not found,
say:

"I could not find that information in the uploaded document."

Context:
{context}

Question:
{question}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    return response.choices[0].message.content