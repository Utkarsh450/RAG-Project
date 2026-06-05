from langchain_core.output_parsers import (
    StrOutputParser
)

from services.llms.groq_llm import (
    llm
)

from services.prompts.document_meta_prompt import (
    document_meta_prompt
)

document_meta_chain = (
    document_meta_prompt
    |
    llm
    |
    StrOutputParser()
)