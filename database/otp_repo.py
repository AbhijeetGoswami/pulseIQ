class OtpRepository:

    def create_otp(
        self,
        user_id: int,
        otp: str,
        expires_at
    ):
        ...

    def get_latest_otp(self, user_id: int):
        ...

    def mark_verified(self, otp_id: int):
        ...

    def delete_expired(self):
        ...

    def delete_user_otps(self, user_id: int):
        ...