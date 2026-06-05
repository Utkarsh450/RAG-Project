from langchain_core.output_parsers import (
    StrOutputParser
)

from services.llms.groq_llm import (
    llm
)

from services.prompts.document_prompt import (
    document_prompt
)

rag_chain = (
    document_prompt
    |
    llm
    |
    StrOutputParser()
)