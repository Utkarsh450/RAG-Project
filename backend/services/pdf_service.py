from pypdf import PdfReader
import pytesseract
from PIL import Image
from pdf2image import convert_from_path
import os


def extract_pdf_text(file_path):

    # Try standard text extraction first
    reader = PdfReader(file_path)
    text = ""
    pages_with_text = 0

    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n\n"
            pages_with_text += 1

    print(f"PDF STATS: {len(reader.pages)} pages total, {pages_with_text} with text, {len(text.strip())} chars", flush=True)

    # If extraction is empty/too small, use OCR
    if len(text.strip()) < 200:
        print("USING OCR - text too small", flush=True)
        try:
            images = convert_from_path(file_path)
            for i, image in enumerate(images):
                ocr_text = pytesseract.image_to_string(image)
                if ocr_text:
                    text += f"\n\n--- Page {i+1} ---\n{ocr_text}"
        except Exception as e:
            print(f"OCR failed: {e}", flush=True)

    return text