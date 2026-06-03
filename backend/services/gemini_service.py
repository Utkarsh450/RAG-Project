import os
import time

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
You are a document assistant. Answer questions about the document content accurately.

<DOCUMENT_CONTEXT>
{context}
</DOCUMENT_CONTEXT>

<CONVERSATION_HISTORY>
{history}
</CONVERSATION_HISTORY>

<USER_QUESTION>
{question}
</USER_QUESTION>

Instructions:
1. Use ONLY the document context provided above
2. For generic questions (like "summarize", "what is this about", "overview"), synthesize information from the context
3. For specific questions, find and cite relevant sections
4. If information is not in the document, say: "I could not find that information in the document."
5. Be direct and concise
6. Never make up information

Answer the question now:
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


def generate_answer_stream(
    context,
    question,
    history
):

    prompt = f"""
You are a document assistant. Answer questions about the document content accurately.

<DOCUMENT_CONTEXT>
{context}
</DOCUMENT_CONTEXT>

<CONVERSATION_HISTORY>
{history}
</CONVERSATION_HISTORY>

<USER_QUESTION>
{question}
</USER_QUESTION>

Instructions:
1. Use ONLY the document context provided above
2. For generic questions (like "summarize", "what is this about", "overview"), synthesize information from the context
3. For specific questions, find and cite relevant sections
4. If information is not in the document, say: "I could not find that information in the document."
5. Be direct and concise
6. Never make up information

Answer the question now:
"""

    stream = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0,
        stream=True
    )

    for chunk in stream:

        content = (
            chunk.choices[0]
            .delta.content
        )

        if content:

            print(
                "CHUNK:",
                content,
                flush=True
            )

            yield content

            # testing only
            # time.sleep(0.03)