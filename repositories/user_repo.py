from datetime import datetime

from database.db import get_connection
from models.user import User


class UserRepository:

    def create_user(
        self,
        email: str,
        password_hash: str,
        first_name: str,
        last_name: str,
        role: str = "viewer"
    ):

        conn = get_connection()
        cursor = conn.cursor()

        try:

            cursor.execute(
                """
                INSERT INTO users
                (
                    email,
                    password_hash,
                    first_name,
                    last_name,
                    role,
                    is_active
                )
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    email,
                    password_hash,
                    first_name,
                    last_name,
                    role,
                    1
                )
            )

            conn.commit()

            return self.find_by_email(email)

        finally:

            conn.close()


    def find_by_email(self, email: str):

        conn = get_connection()
        cursor = conn.cursor()

        try:

            cursor.execute(
                """
                SELECT
                    id,
                    email,
                    password_hash,
                    first_name,
                    last_name,
                    role,
                    is_active,
                    created_at
                FROM users
                WHERE email = ?
                """,
                (email,)
            )

            row = cursor.fetchone()

            if row is None:
                return None

            return User(
                id=row[0],
                email=row[1],
                password_hash=row[2],
                first_name=row[3],
                last_name=row[4],
                role=row[5],
                is_active=bool(row[6]),
                created_at=row[7]
            )

        finally:

            conn.close()


    def find_by_id(self, user_id: int):

        conn = get_connection()
        cursor = conn.cursor()

        try:

            cursor.execute(
                """
                SELECT
                    id,
                    email,
                    password_hash,
                    first_name,
                    last_name,
                    role,
                    is_active,
                    created_at
                FROM users
                WHERE id = ?
                """,
                (user_id,)
            )

            row = cursor.fetchone()

            if row is None:
                return None

            return User(
                id=row[0],
                email=row[1],
                password_hash=row[2],
                first_name=row[3],
                last_name=row[4],
                role=row[5],
                is_active=bool(row[6]),
                created_at=row[7]
            )

        finally:

            conn.close()


    def update_password(
        self,
        user_id: int,
        password_hash: str
    ):

        conn = get_connection()
        cursor = conn.cursor()

        try:

            cursor.execute(
                """
                UPDATE users
                SET password_hash = ?
                WHERE id = ?
                """,
                (
                    password_hash,
                    user_id
                )
            )

            conn.commit()

        finally:

            conn.close()


    def deactivate_user(self, user_id: int):

        conn = get_connection()
        cursor = conn.cursor()

        try:

            cursor.execute(
                """
                UPDATE users
                SET is_active = 0
                WHERE id = ?
                """,
                (user_id,)
            )

            conn.commit()

        finally:

            conn.close()


    def activate_user(self, user_id: int):

        conn = get_connection()
        cursor = conn.cursor()

        try:

            cursor.execute(
                """
                UPDATE users
                SET is_active = 1
                WHERE id = ?
                """,
                (user_id,)
            )

            conn.commit()

        finally:

            conn.close()


    def list_users(self):

        conn = get_connection()
        cursor = conn.cursor()

        try:

            cursor.execute(
                """
                SELECT
                    id,
                    email,
                    password_hash,
                    first_name,
                    last_name,
                    role,
                    is_active,
                    created_at
                FROM users
                ORDER BY first_name, last_name
                """
            )

            rows = cursor.fetchall()

            return [
                User(
                    id=row[0],
                    email=row[1],
                    password_hash=row[2],
                    first_name=row[3],
                    last_name=row[4],
                    role=row[5],
                    is_active=bool(row[6]),
                    created_at=row[7]
                )
                for row in rows
            ]

        finally:

            conn.close()