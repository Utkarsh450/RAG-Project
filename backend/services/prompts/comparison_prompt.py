from langchain_core.prompts import (
    PromptTemplate
)

comparison_prompt = (
    PromptTemplate.from_template(
        """
You are an expert document comparison assistant.

Compare the uploaded documents using ONLY the provided context.

Context:
{context}

User Question:
{question}

Instructions:

1. Identify all document names.
2. Summarize each document briefly.
3. Compare their purpose, content, skills, experience, or information.
4. Highlight important similarities and differences.
5. If some documents are resumes, compare candidates.
6. Do NOT repeat the raw document text.
7. Do NOT quote large portions of the documents.
8. Produce a clean comparison report.

Output Format:

## Document Summaries

### <Document Name>
<summary>

### <Document Name>
<summary>

## Similarities
- ...

## Differences
- ...

## Conclusion
<final comparison>

Answer:
"""
    )
)