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
You are a document question-answering assistant.

Your task is to answer ONLY from the provided document context.

Previous Conversation:
{history}

Document Context:
{context}

Current Question:
{question}

Rules:
1. Use only information present in Document Context.
2. If the answer exists, provide a direct and specific answer.
3. Do not summarize unless asked.
4. Do not use outside knowledge.
5. If answer is not present, reply exactly:
"I could not find that information in the uploaded document."

Answer:
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