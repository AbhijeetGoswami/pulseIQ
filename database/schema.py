"""
Database schema creation.
"""

from database.db import get_connection
from utils.logger import logger


def initialize_database():
    conn = get_connection()
    cursor = conn.cursor()

    # -------------------------
    # NEWS TABLE
    # -------------------------
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

    # -------------------------
    # COLLECTOR RUNS TABLE
    # -------------------------
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS collector_runs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            run_started TEXT,
            run_finished TEXT,
            total_articles INTEGER,
            inserted INTEGER,
            duplicates INTEGER,
            failed INTEGER,
            duration_ms INTEGER
        );
    """)

    # -------------------------
    # SOURCE METRICS TABLE
    # -------------------------
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS source_metrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            run_id INTEGER NOT NULL,
            source TEXT,
            status INTEGER,
            entries INTEGER,
            duration_ms INTEGER,
            collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(run_id)
                REFERENCES collector_runs(id)
        );
    """)

    conn.commit()
    conn.close()

    print("✅ Database schema initialized.")
    logger.info("Database schema initialized successfully.")