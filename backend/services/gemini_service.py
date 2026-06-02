import os

from groq import Groq

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_answer(
    context,
    question,
    history
):

    prompt = f"""
You are a helpful document assistant.

Chat History:
{history}

Context:
{context}

Question:
{question}

Answer only using the context.
If answer is not found, say:
'I could not find that information in the document.'
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