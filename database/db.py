from pathlib import Path
import sqlite3

from config import DB_PATH


def get_connection():
    """
    Returns a SQLite connection.
    """

    DB_PATH.parent.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(
        DB_PATH,
        timeout=30
    )

    conn.execute("PRAGMA foreign_keys = ON")

    return conn