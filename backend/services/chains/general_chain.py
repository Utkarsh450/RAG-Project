from langchain_core.output_parsers import (
    StrOutputParser
)

from services.llms.groq_llm import (
    llm
)

from services.prompts.general_prompt import (
    general_prompt
)

general_chain = (
    general_prompt
    |
    llm
    |
    StrOutputParser()
)