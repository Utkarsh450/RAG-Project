from fastapi import (
    APIRouter,
    UploadFile,
    File
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

    chunks = chunk_text(text)

    store_chunks(chunks)

    return {
        "success": True,
        "chunks": len(chunks)
    }