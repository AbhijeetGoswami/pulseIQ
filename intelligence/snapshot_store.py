import json
from pathlib import Path
from datetime import datetime, timezone


class SnapshotStore:
    """
    Persists Attention and Trend snapshots as JSON files.

    Storage Layout

    storage/
        attention/
            *.json

        trends/
            *.json
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
                ensure_ascii=False
            )

        return filepath

    def _read_json(self, filepath: Path):

        with open(filepath, "r", encoding="utf-8") as fp:
            return json.load(fp)

    def _latest_files(self, directory: Path, count: int = 1):

        files = sorted(
            directory.glob("*.json"),
            reverse=True
        )

        return files[:count]

    def _latest(self, directory: Path):

        files = self._latest_files(directory)

        if not files:
            return None

        return self._read_json(files[0])

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

    def get_latest_two_attention_snapshots(self):
        """
        Returns:

            (previous_snapshot, current_snapshot)

        Returns (None, None) when fewer than
        two snapshots exist.
        """

        files = self._latest_files(
            self.attention_dir,
            count=2
        )

        if len(files) < 2:
            return None, None

        current = self._read_json(files[0])
        previous = self._read_json(files[1])

        return previous, current

    # Backward compatibility
    def latest_two_attention(self):
        return self.get_latest_two_attention_snapshots()

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