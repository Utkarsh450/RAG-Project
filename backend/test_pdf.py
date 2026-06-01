from services.pdf_service import (
    extract_pdf_text
)

text = extract_pdf_text(
    "sample.pdf"
)

print(text[:500])