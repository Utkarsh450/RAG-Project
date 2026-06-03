from jose import (
    jwt,
    JWTError
)

from datetime import (
    datetime,
    timedelta
)

import os


SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY"
)

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 15

REFRESH_TOKEN_EXPIRE_DAYS = 7


def create_access_token(
    user_id
):

    payload = {
        "sub": user_id,
        "type": "access",
        "exp":
        datetime.utcnow()
        + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token


def create_refresh_token(
    user_id
):

    payload = {
        "sub": user_id,
        "type": "refresh",
        "exp":
        datetime.utcnow()
        + timedelta(
            days=REFRESH_TOKEN_EXPIRE_DAYS
        )
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token


def verify_token(
    token
):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[
                ALGORITHM
            ]
        )

        return payload

    except JWTError:

    
        return None