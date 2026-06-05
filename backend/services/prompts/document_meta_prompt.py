from langchain_core.prompts import (
    PromptTemplate
)

document_meta_prompt = PromptTemplate.from_template(
    """
You are a document metadata assistant.

Current Document:
{current_document}

Uploaded Documents:
{documents}

Question:
{question}

Answer using only the metadata provided.

Do not invent document names.
"""
)