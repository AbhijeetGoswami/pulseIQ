"""
Authentication service for PulseIQ.
"""

import random
from datetime import datetime, timedelta

from repositories.user_repo import UserRepository
from repositories.otp_repo import OtpRepository

from security.hashing import verify_password
from security.jwt import create_access_token


class AuthService:

    def __init__(self):
        self.user_repo = UserRepository()
        self.otp_repo = OtpRepository()

    # ------------------------------------------------------------------
    # LOGIN
    # ------------------------------------------------------------------

    def login(self, email: str, password: str):
        """
        Authenticate user credentials and generate OTP.
        """

        user = self.user_repo.find_by_email(email)

        if user is None:
            raise ValueError("Invalid email or password.")

        if not user.is_active:
            raise ValueError("User account is disabled.")

        if not verify_password(password, user.password_hash):
            raise ValueError("Invalid email or password.")

        if user.id is None:
            raise ValueError("User ID is missing.")

        otp = self._generate_otp()

        expires_at = datetime.utcnow() + timedelta(minutes=5)

        self.otp_repo.create_otp(
            user_id=user.id,
            otp=otp,
            expires_at=expires_at
        )

        # TODO:
        # Replace with EmailService.send_otp(...)
        print(f"OTP for {email}: {otp}")

        return {
            "status": "otp_sent",
            "message": "OTP sent successfully."
        }

    # ------------------------------------------------------------------
    # VERIFY OTP
    # ------------------------------------------------------------------

    def verify_otp(
        self,
        email: str,
        otp: str
    ):
        """
        Verify OTP and issue JWT.
        """

        user = self.user_repo.find_by_email(email)

        if user is None:
            raise ValueError("User not found.")

        if user.id is None:
            raise ValueError("User ID is missing.")

        record = self.otp_repo.get_latest_otp(user.id)

        if record is None:
            raise ValueError("OTP not found.")

        if record.verified:
            raise ValueError("OTP already used.")

        if datetime.utcnow() > record.expires_at:
            raise ValueError("OTP expired.")

        if record.otp != otp:
            raise ValueError("Invalid OTP.")
        
        if record.id is None:
            raise ValueError("OTP record ID is missing.")

        self.otp_repo.mark_verified(record.id)

        token = create_access_token(
            user_id=user.id,
            email=user.email,
            role=user.role
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "role": user.role
            }
        }

    # ------------------------------------------------------------------
    # CURRENT USER
    # ------------------------------------------------------------------

    def get_user(self, email: str):
        """
        Retrieve the authenticated user.
        """

        user = self.user_repo.find_by_email(email)

        if user is None:
            return None

        return {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
            "is_active": user.is_active
        }

    # ------------------------------------------------------------------
    # OTP
    # ------------------------------------------------------------------

    @staticmethod
    def _generate_otp() -> str:
        """
        Generate a random six-digit OTP.
        """

        return f"{random.randint(100000, 999999)}"