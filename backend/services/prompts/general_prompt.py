from langchain_core.prompts import (
    PromptTemplate
)

general_prompt = PromptTemplate.from_template(
    """
You are a helpful AI assistant.

Conversation History:
{history}

Question:
{question}

Use conversation history when relevant.

Answer the question clearly and accurately.
"""
)