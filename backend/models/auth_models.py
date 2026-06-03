from pydantic import (
    BaseModel,
    EmailStr
)


class RegisterRequest(
    BaseModel
):
    email: EmailStr
    password: str


class LoginRequest(
    BaseModel
):
    email: EmailStr
    password: str


class RefreshTokenRequest(
    BaseModel
):
    refresh_token: str


class LogoutRequest(
    BaseModel
):
    refresh_token: str