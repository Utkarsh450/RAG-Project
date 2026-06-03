from fastapi import (
    APIRouter,
    HTTPException,
    Depends
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