"""
JWT token utilities for PulseIQ Authentication.
"""

from datetime import datetime, timedelta, timezone
from typing import Dict, Any

from jose import JWTError, jwt


# ============================================================================
# Configuration
# ============================================================================

SECRET_KEY = "CHANGE_ME_TO_A_RANDOM_SECRET_IN_PRODUCTION"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


# ============================================================================
# Token Creation
# ============================================================================

def create_access_token(
    user_id: int,
    email: str,
    role: str
) -> str:
    """
    Generate a signed JWT access token.
    """

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(user_id),
        "email": email,
        "role": role,
        "exp": expire
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# ============================================================================
# Token Verification
# ============================================================================

def verify_token(token: str) -> Dict[str, Any]:
    """
    Verify and decode a JWT.

    Raises JWTError if invalid.
    """

    return jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM]
    )


# ============================================================================
# Safe Decode
# ============================================================================

def decode_token(token: str):
    """
    Decode a token.

    Returns:
        payload if valid
        None if invalid
    """

    try:
        return verify_token(token)

    except JWTError:
        return None