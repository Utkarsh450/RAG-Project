import os

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)

from services.pdf_service import (
    extract_pdf_text
)

from services.chunk_service import (
    chunk_text
)

from services.pinecone_service import (
    store_chunks
)

router = APIRouter()


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    try:

        # PDF Validation
        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed"
            )

        # Create uploads folder if not exists
        os.makedirs(
            "uploads",
            exist_ok=True
        )

        file_path = (
            f"uploads/{file.filename}"
        )

        # Save PDF
        with open(
            file_path,
            "wb"
        ) as f:

            content = await file.read()

            f.write(content)

        # Extract text
        text = extract_pdf_text(
            file_path
        )

        if not text.strip():

            os.remove(file_path)

            raise HTTPException(
                status_code=400,
                detail="No text found in PDF"
            )

        # Create chunks
        chunks = chunk_text(text)

        # Store in Pinecone with metadata
        store_chunks(
            chunks,
            file.filename
        )

        # Delete local file after processing
        os.remove(file_path)

        return {
            "success": True,
            "document": file.filename,
            "chunks": len(chunks),
            "message":
            "PDF indexed successfully"
        }

    except HTTPException:
        raise

    except Exception as e:

        if (
            os.path.exists(file_path)
        ):
            os.remove(file_path)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )