import os

from google import genai
print(os.getenv("GEMINI_API_KEY"))

client = genai.Client(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)
print(os.getenv("GEMINI_API_KEY"))


def create_embedding(text):

    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text,
        config={
            "output_dimensionality": 768
        }
    )

    return result.embeddings[0].values