"""
Authentication Router
"""

from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException, status
from jose import JWTError
from pydantic import BaseModel

from security.jwt import verify_token
from services.auth_service import AuthService

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

auth_service = AuthService()


# ==========================================================
# Request Models
# ==========================================================

class LoginRequest(BaseModel):
    email: str
    password: str


class VerifyOtpRequest(BaseModel):
    email: str
    otp: str


# ==========================================================
# Authentication Dependency
# ==========================================================

def get_current_user(
    authorization: Optional[str] = Header(None)
):
    """
    Extract the authenticated user from the JWT.
    """

    if authorization is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing."
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header."
        )

    token = authorization.replace("Bearer ", "")

    try:

        payload = verify_token(token)

        return payload

    except JWTError:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token."
        )


# ==========================================================
# Login
# ==========================================================

@router.post("/login")
def login(request: LoginRequest):

    try:

        return auth_service.login(
            request.email,
            request.password
        )

    except ValueError as ex:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(ex)
        )


# ==========================================================
# Verify OTP
# ==========================================================

@router.post("/verify")
def verify(request: VerifyOtpRequest):

    try:

        return auth_service.verify_otp(
            request.email,
            request.otp
        )

    except ValueError as ex:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(ex)
        )


# ==========================================================
# Current User
# ==========================================================

@router.get("/me")
def me(
    current_user=Depends(get_current_user)
):

    email = current_user.get("email")

    user = auth_service.get_user(email)

    if user is None:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    return user


# ==========================================================
# Logout
# ==========================================================

@router.post("/logout")
def logout(
    current_user=Depends(get_current_user)
):

    return {
        "status": "success",
        "message": "Logged out successfully."
    }


# ==========================================================
# Health
# ==========================================================

@router.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "authentication"
    }