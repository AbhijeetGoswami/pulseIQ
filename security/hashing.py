"""
Password hashing utilities.

Uses bcrypt for secure password hashing and verification.
"""

import bcrypt


def hash_password(password: str) -> str:
    """
    Hash a plain text password.

    Args:
        password: Plain text password.

    Returns:
        Bcrypt hashed password.
    """
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(
        password.encode("utf-8"),
        salt
    )

    return password_hash.decode("utf-8")


def verify_password(
    password: str,
    password_hash: str
) -> bool:
    """
    Verify a plain text password against a bcrypt hash.

    Args:
        password: Plain text password.
        password_hash: Stored bcrypt hash.

    Returns:
        True if password matches.
    """
    return bcrypt.checkpw(
        password.encode("utf-8"),
        password_hash.encode("utf-8")
    )