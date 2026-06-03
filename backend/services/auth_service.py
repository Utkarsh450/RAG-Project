from db.db import (
    user_collection,
    refresh_token_collection
)

from utils.password import (
    hash_password,
    verify_password
)

from utils.jwt_handler import (
    create_access_token,
    create_refresh_token,
    verify_token,
)


def refresh_access_token(
    refresh_token
):

    payload = verify_token(
        refresh_token
    )

    if not payload:
        return None

    if payload["type"] != "refresh":
        return None

    stored_token = (
        refresh_token_collection.find_one(
            {
                "token": refresh_token
            }
        )
    )

    if not stored_token:
        return None

    new_access_token = (
        create_access_token(
            payload["sub"]
        )
    )

    return {
        "access_token":
        new_access_token,

        "token_type":
        "bearer"
    }


def create_user(
    email,
    password
):

    existing_user = (
        user_collection.find_one(
            {
                "email": email
            }
        )
    )

    if existing_user:
        return None

    hashed_password = (
        hash_password(
            password
        )
    )

    user_collection.insert_one(
        {
            "email": email,
            "password": hashed_password
        }
    )

    return True


def login_user(
    email,
    password
):

    user = (
        user_collection.find_one(
            {
                "email": email
            }
        )
    )

    if not user:
        return None

    is_valid = (
        verify_password(
            password,
            user["password"]
        )
    )

    if not is_valid:
        return None

    access_token = (
        create_access_token(
            str(user["_id"])
        )
    )

    refresh_token = (
        create_refresh_token(
            str(user["_id"])
        )
    )

    refresh_token_collection.insert_one(
        {
            "user_id":
            str(user["_id"]),

            "token":
            refresh_token
        }
    )

    return {
        "access_token":
        access_token,

        "refresh_token":
        refresh_token,

        "token_type":
        "bearer"
    }


def logout_user(
    refresh_token
):

    refresh_token_collection.delete_one(
        {
            "token":
            refresh_token
        }
    )

    return True