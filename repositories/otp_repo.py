from datetime import datetime

from database.db import get_connection
from models.otp import OtpCode


class OtpRepository:

    def create_otp(
        self,
        user_id: int,
        otp: str,
        expires_at: datetime
    ):

        conn = get_connection()
        cursor = conn.cursor()

        try:

            cursor.execute(
                """
                INSERT INTO otp_codes
                (
                    user_id,
                    otp,
                    expires_at,
                    verified
                )
                VALUES (?, ?, ?, ?)
                """,
                (
                    user_id,
                    otp,
                    expires_at.isoformat(),
                    0
                )
            )

            conn.commit()

        finally:

            conn.close()

    def get_latest_otp(self, user_id: int):

        conn = get_connection()
        cursor = conn.cursor()

        try:

            cursor.execute(
                """
                SELECT
                    id,
                    user_id,
                    otp,
                    expires_at,
                    verified,
                    created_at
                FROM otp_codes
                WHERE user_id = ?
                ORDER BY created_at DESC
                LIMIT 1
                """,
                (user_id,)
            )

            row = cursor.fetchone()

            if row is None:
                return None

            return OtpCode(
                id=row[0],
                user_id=row[1],
                otp=row[2],
                expires_at=datetime.fromisoformat(row[3]),
                verified=bool(row[4]),
                created_at=datetime.fromisoformat(row[5]) if row[5] else None
            )

        finally:

            conn.close()

    def mark_verified(self, otp_id: int):

        conn = get_connection()
        cursor = conn.cursor()

        try:

            cursor.execute(
                """
                UPDATE otp_codes
                SET verified = 1
                WHERE id = ?
                """,
                (otp_id,)
            )

            conn.commit()

        finally:

            conn.close()

    def delete_expired(self):

        conn = get_connection()
        cursor = conn.cursor()

        try:

            cursor.execute(
                """
                DELETE
                FROM otp_codes
                WHERE expires_at < ?
                """,
                (datetime.utcnow().isoformat(),)
            )

            conn.commit()

        finally:

            conn.close()

    def delete_user_otps(self, user_id: int):

        conn = get_connection()
        cursor = conn.cursor()

        try:

            cursor.execute(
                """
                DELETE
                FROM otp_codes
                WHERE user_id = ?
                """,
                (user_id,)
            )

            conn.commit()

        finally:

            conn.close()