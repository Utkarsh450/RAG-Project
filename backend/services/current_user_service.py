from fastapi import (
    Depends,
    HTTPException
)

from bson import ObjectId

from fastapi.security import (
    OAuth2PasswordBearer
)

from utils.jwt_handler import (
    verify_token
)

from db.db import (
    user_collection
)

oauth2_scheme = (
    OAuth2PasswordBearer(
        tokenUrl="/api/auth/login"
    )
)


def get_current_user(
    token: str = Depends(
        oauth2_scheme
    )
):

    payload = verify_token(
        token
    )

    if not payload:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    if payload["type"] != "access":

        raise HTTPException(
            status_code=401,
            detail="Access token required"
        )

    user_id = payload["sub"]

    user = (
        user_collection.find_one(
            {
                "_id": ObjectId(
                    user_id
                )
            }
        )
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="User not found"
        )



    return user