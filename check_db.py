import sqlite3
import os

db = "data/pulseiq.db"

print("Database:", os.path.abspath(db))
print("Size:", os.path.getsize(db), "bytes")

conn = sqlite3.connect(db)
cur = conn.cursor()

cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
print("Tables:", cur.fetchall())

for table in ["collector_runs", "source_metrics", "news"]:
    cur.execute(f"SELECT COUNT(*) FROM {table}")
    print(f"{table}: {cur.fetchone()[0]} rows")

conn.close()