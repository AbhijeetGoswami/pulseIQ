import json
from pathlib import Path
from datetime import datetime, timezone


class SnapshotStore:
    """
    Persists Attention and Trend snapshots as JSON files.

    Storage Layout

    storage/
        attention/
            2026-07-11T10-00-00.json
            ...
        trends/
            2026-07-11T10-00-00.json
            ...
    """

    def __init__(self, storage_dir: str = "storage"):

        self.storage_dir = Path(storage_dir)

        self.attention_dir = self.storage_dir / "attention"
        self.trends_dir = self.storage_dir / "trends"

        self.attention_dir.mkdir(parents=True, exist_ok=True)
        self.trends_dir.mkdir(parents=True, exist_ok=True)

    # ==========================================================
    # Helpers
    # ==========================================================

    def _filename(self):

        return (
            datetime.now(timezone.utc)
            .isoformat()
            .replace(":", "-")
            + ".json"
        )

    def _write_json(self, directory: Path, snapshot: dict):

        filepath = directory / self._filename()

        with open(filepath, "w", encoding="utf-8") as fp:

            json.dump(
                snapshot,
                fp,
                indent=4,
                ensure_ascii=False,
            )

        return filepath

    def _latest(self, directory: Path):

        files = sorted(
            directory.glob("*.json"),
            reverse=True
        )

        if not files:
            return None

        with open(files[0], "r", encoding="utf-8") as fp:

            return json.load(fp)

    # ==========================================================
    # Attention
    # ==========================================================

    def save_attention(self, snapshot: dict):

        return self._write_json(
            self.attention_dir,
            snapshot
        )

    def latest_attention(self):

        return self._latest(
            self.attention_dir
        )

    # ==========================================================
    # Trends
    # ==========================================================

    def save_trend(self, snapshot: dict):

        return self._write_json(
            self.trends_dir,
            snapshot
        )

    def latest_trend(self):

        return self._latest(
            self.trends_dir
        )

    # ==========================================================
    # Utility
    # ==========================================================

    def latest_two_attention(self):
        """
        Returns:
            previous_snapshot,
            current_snapshot
        """

        files = sorted(
            self.attention_dir.glob("*.json"),
            reverse=True
        )

        if len(files) < 2:
            return None, None

        with open(files[1], "r", encoding="utf-8") as fp:
            previous = json.load(fp)

        with open(files[0], "r", encoding="utf-8") as fp:
            current = json.load(fp)

        return previous, current