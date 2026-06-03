from fastapi import (
    APIRouter,
    Depends
)

from services.current_user_service import (
    get_current_user
)

from services.document_service import (
    get_documents
)

router = APIRouter()


@router.get(
    "/documents"
)
def get_user_documents(
    current_user=Depends(
        get_current_user
    )
):

    user_id = str(
        current_user["_id"]
    )

    return get_documents(
        user_id
    )