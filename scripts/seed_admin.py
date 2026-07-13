"""
Seed the default administrator account.

Run:

    python scripts/seed_admin.py
"""

import os
import sys

PROJECT_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")
)

if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from repositories.user_repo import UserRepository
from security.hashing import hash_password


DEFAULT_ADMIN = {
    "first_name": "AttenBase",
    "last_name": "Admin",
    "email": "admin@attenbase.ai",
    "password": "Admin@123",
    "role": "admin"
}


def main():

    repo = UserRepository()

    existing = repo.find_by_email(
        DEFAULT_ADMIN["email"]
    )

    if existing:

        print("=" * 60)
        print("Administrator already exists.")
        print(existing.email)
        print("=" * 60)
        return

    password_hash = hash_password(
        DEFAULT_ADMIN["password"]
    )

    repo.create_user(
        email=DEFAULT_ADMIN["email"],
        password_hash=password_hash,
        first_name=DEFAULT_ADMIN["first_name"],
        last_name=DEFAULT_ADMIN["last_name"],
        role=DEFAULT_ADMIN["role"]
    )

    print("=" * 60)
    print("Administrator account created successfully.")
    print("=" * 60)
    print(f"Email    : {DEFAULT_ADMIN['email']}")
    print(f"Password : {DEFAULT_ADMIN['password']}")
    print("=" * 60)


if __name__ == "__main__":
    main()