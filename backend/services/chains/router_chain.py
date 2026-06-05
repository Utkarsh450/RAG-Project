from langchain_core.output_parsers import (
    StrOutputParser
)

from services.llms.groq_llm import (
    llm
)

from services.prompts.router_prompt import (
    router_prompt
)

router_chain = (
    router_prompt
    |
    llm
    |
    StrOutputParser()
)