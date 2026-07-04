"""
Database module for PulseIQ.

Responsible for:
- Creating SQLite database
- Creating required tables
- Providing database connections
"""

import sqlite3
from pathlib import Path

# Database location
DB_PATH = Path("data") / "pulseiq.db"


def get_connection():
    """
    Returns a connection to the SQLite database.
    Creates the database automatically if it does not exist.
    """
    return sqlite3.connect(DB_PATH)


def initialize_database():
    """
    Creates required database tables.
    Safe to call multiple times.
    """

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            source TEXT NOT NULL,
            published_at TEXT,
            link TEXT UNIQUE,
            category TEXT,
            collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    connection.commit()
    connection.close()

    print("✅ Database initialized successfully.")