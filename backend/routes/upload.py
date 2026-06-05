import os

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Depends
)

from services.txt_service import extract_txt_text
from services.docx_service import extract_docx_text
from services.pptx_service import extract_pptx_text
from services.document_service import create_document
from services.pdf_service import extract_pdf_text
from services.chunk_service import chunk_text
from services.pinecone_service import store_chunks
from services.current_user_service import get_current_user
from services.image_service import (
    extract_image_text
)
import traceback

router = APIRouter()


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):
    user_id = str(current_user["_id"])

    try:
        os.makedirs("uploads", exist_ok=True)

        file_path = f"uploads/{file.filename}"

        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        extension = file.filename.split(".")[-1].lower()

        if extension == "pdf":
            text = extract_pdf_text(file_path)
        elif extension == "txt":
            text = extract_txt_text(file_path)
        elif extension == "docx":
            text = extract_docx_text(file_path)
        elif extension == "pptx":
            text = extract_pptx_text(file_path)
        elif extension in [
            "png",
            "jpg",
            "jpeg"
        ]:

            text = extract_image_text(
            file_path
            )
            print(text[:5000])
        else:
            raise HTTPException(
                status_code=400,
                detail="Unsupported file type"
            )

        print(f"FILE: {file.filename}", flush=True)
        print(f"TEXT EXTRACTED: {len(text)} chars", flush=True)

        if not text.strip():
            os.remove(file_path)
            raise HTTPException(
                status_code=400,
                detail="No text found in PDF"
            )

        chunks = chunk_text(text)

        print(f"CHUNKS CREATED: {len(chunks)}", flush=True)

        store_chunks(chunks, user_id, file.filename)

        create_document(user_id, file.filename, extension)

        os.remove(file_path)

        return {
            "success": True,
            "document": file.filename,
            "chunks": len(chunks),
            "message": "Document indexed successfully"
        }

    except HTTPException:
        raise

    except Exception as e:
        if 'file_path' in locals() and os.path.exists(file_path):
            os.remove(file_path)
            traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )