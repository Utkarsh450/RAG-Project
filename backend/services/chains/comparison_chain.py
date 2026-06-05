from langchain_core.output_parsers import (
    StrOutputParser
)

from services.llms.groq_llm import (
    llm
)

from services.prompts.comparison_prompt import (
    comparison_prompt
)

comparison_chain = (
    comparison_prompt
    |
    llm
    |
    StrOutputParser()
)