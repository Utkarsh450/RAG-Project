import os

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Depends
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

from services.current_user_service import (
    get_current_user
)

router = APIRouter()


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    current_user=Depends(
        get_current_user
    )
):

    user_id = str(
        current_user["_id"]
    )

    try:

        if not file.filename.lower().endswith(
            ".pdf"
        ):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed"
            )

        os.makedirs(
            "uploads",
            exist_ok=True
        )

        file_path = (
            f"uploads/{file.filename}"
        )

        with open(
            file_path,
            "wb"
        ) as f:

            content = await file.read()

            f.write(content)

        text = extract_pdf_text(
            file_path
        )

        print(
            f"FILE: {file.filename}",
            flush=True
        )

        print(
            f"TEXT EXTRACTED: {len(text)} chars",
            flush=True
        )

        if not text.strip():

            os.remove(file_path)

            raise HTTPException(
                status_code=400,
                detail="No text found in PDF"
            )

        chunks = chunk_text(
            text
        )

        print(
            f"CHUNKS CREATED: {len(chunks)}",
            flush=True
        )

        store_chunks(
            chunks,
            user_id,
            file.filename
        )

        os.remove(
            file_path
        )

        return {
            "success": True,
            "document":
            file.filename,
            "chunks":
            len(chunks),
            "message":
            "PDF indexed successfully"
        }

    except HTTPException:

        raise

    except Exception as e:

        if (
            'file_path' in locals()
            and os.path.exists(
                file_path
            )
        ):
            os.remove(
                file_path
            )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )