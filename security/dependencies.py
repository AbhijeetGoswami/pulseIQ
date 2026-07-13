from fastapi import Depends, Header, HTTPException, status
from jose import JWTError

from security.jwt import verify_token


def get_current_user(
    authorization: str = Header(None)
):
    """
    Validate JWT and return the authenticated user payload.
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


def require_admin(
    current_user=Depends(get_current_user)
):
    """
    Allow only administrators.
    """

    if current_user.get("role") != "admin":

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrator privileges required."
        )

    return current_user


def require_analyst(
    current_user=Depends(get_current_user)
):
    """
    Allow analysts and administrators.
    """

    role = current_user.get("role")

    if role not in ("admin", "analyst"):

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Analyst privileges required."
        )

    return current_user


def require_authenticated_user(
    current_user=Depends(get_current_user)
):
    """
    Any authenticated user.
    """

    return current_user