from langchain_google_genai import (
    GoogleGenerativeAIEmbeddings
)

embeddings = (
    GoogleGenerativeAIEmbeddings(
        model=
        "models/gemini-embedding-001"
    )
)


def create_embedding(
    text
):
    return embeddings.embed_query(
        text
    )