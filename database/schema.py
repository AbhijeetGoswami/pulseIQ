"""
Database schema creation.
"""

from database.db import get_connection


def initialize_database():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            source TEXT NOT NULL,
            published_at TEXT,
            link TEXT NOT NULL UNIQUE,
            category TEXT,
            collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    conn.commit()
    conn.close()

    print("✅ Database schema initialized.")