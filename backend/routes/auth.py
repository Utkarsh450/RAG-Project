from fastapi import (
    APIRouter,
    HTTPException,
    Depends
)
from fastapi import Request
from fastapi.responses import RedirectResponse
from services.github_oauth_service import (
    oauth_github
)
from services.auth_service import (
    create_user,
    login_user,
    refresh_access_token,
    logout_user,
    get_or_create_github_user
)

from fastapi import Request

from services.google_oauth_service import (
    oauth
)

from services.auth_service import (
    get_or_create_google_user
)

from models.auth_models import (
    RegisterRequest,
    LoginRequest,
    RefreshTokenRequest,
    LogoutRequest
)

from services.auth_service import (
    create_user,
    login_user,
    refresh_access_token,
    logout_user
)
from utils.jwt_handler import (
    create_access_token,
    create_refresh_token
)

from db.db import (
    refresh_token_collection
)

from services.current_user_service import (
    get_current_user
)

router = APIRouter()


@router.post("/register")
def register(
    payload: RegisterRequest
):

    success = create_user(
        payload.email,
        payload.password
    )

    if not success:

        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    return {
        "message":
        "User created successfully"
    }


@router.post("/login")
def login(
    payload: LoginRequest
):

    tokens = login_user(
        payload.email,
        payload.password
    )

    if not tokens:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return tokens


@router.post("/refresh")
def refresh_token(
    payload: RefreshTokenRequest
):

    token = refresh_access_token(
        payload.refresh_token
    )

    if not token:

        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token"
        )

    return token


@router.get("/me")
def get_me(
    current_user=Depends(
        get_current_user
    )
):

    return {
        "id":
        str(
            current_user["_id"]
        ),

        "email":
        current_user["email"]
    }


@router.post("/logout")
def logout(
    payload: LogoutRequest
):

    logout_user(
        payload.refresh_token
    )

    return {
        "message":
        "Logged out successfully"
    }
    
    
    
    
    
@router.get(
    "/google/login"
)
async def google_login(
    request: Request
):

    redirect_uri = (
        "http://localhost:8000"
        "/api/auth/google/callback"
    )

    return await oauth.google.authorize_redirect(
        request,
        redirect_uri
    )
@router.get(
    "/google/callback"
)
async def google_callback(
    request: Request
):

    token = await oauth.google.authorize_access_token(
        request
    )

    user_info = token.get(
        "userinfo"
    )

    email = user_info[
        "email"
    ]

    user = (
        get_or_create_google_user(
            email
        )
    )

    access_token = (
        create_access_token(
            str(
                user["_id"]
            )
        )
    )

    refresh_token = (
        create_refresh_token(
            str(
                user["_id"]
            )
        )
    )

    refresh_token_collection.insert_one(
        {
            "user_id":
            str(
                user["_id"]
            ),

            "token":
            refresh_token
        }
    )

    frontend_url = (
        "http://localhost:5173"
        f"/oauth-success?"
        f"access_token={access_token}"
        f"&refresh_token={refresh_token}"
    )

    return RedirectResponse(
        frontend_url
    )
@router.get(
    "/github/login"
)
async def github_login(
    request: Request
):

    redirect_uri = (
        "http://localhost:8000"
        "/api/auth/github/callback"
    )

    return await oauth_github.github.authorize_redirect(
        request,
        redirect_uri
    )
    
@router.get(
    "/github/callback"
)
async def github_callback(
    request: Request
):

    token = (
        await oauth_github.github.authorize_access_token(
            request
        )
    )

    response = (
        await oauth_github.github.get(
            "user",
            token=token
        )
    )

    user_info = (
        response.json()
    )

    email = (
        user_info.get(
            "email"
        )
    )

    if not email:

        emails = (
            await oauth_github.github.get(
                "user/emails",
                token=token
            )
        )

        email_data = (
            emails.json()
        )

        primary_email = next(
            (
                e["email"]
                for e in email_data
                if e["primary"]
            ),
            None
        )

        email = primary_email

    user = (
        get_or_create_github_user(
            email
        )
    )

    access_token = (
        create_access_token(
            str(
                user["_id"]
            )
        )
    )

    refresh_token = (
        create_refresh_token(
            str(
                user["_id"]
            )
        )
    )

    refresh_token_collection.insert_one(
        {
            "user_id":
            str(
                user["_id"]
            ),

            "token":
            refresh_token
        }
    )

    frontend_url = (
        "http://localhost:5173"
        f"/oauth-success?"
        f"access_token={access_token}"
        f"&refresh_token={refresh_token}"
    )

    return RedirectResponse(
        frontend_url
    )