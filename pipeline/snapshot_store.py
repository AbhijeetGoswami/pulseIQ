import json
from pathlib import Path


class SnapshotStore:
    """
    PulseIQ Snapshot Store

    Responsible for persisting and loading
    Attention and Trend snapshots.
    """

    def __init__(self):

        self.base_path = Path("storage")

        self.attention_path = self.base_path / "attention"
        self.trend_path = self.base_path / "trends"

        self.attention_path.mkdir(
            parents=True,
            exist_ok=True,
        )

        self.trend_path.mkdir(
            parents=True,
            exist_ok=True,
        )

    def save_attention(self, snapshot):

        filename = (
            snapshot["generated_at"]
            .replace(":", "-")
            + ".json"
        )

        filepath = self.attention_path / filename

        with open(filepath, "w", encoding="utf-8") as file:
            json.dump(
                snapshot,
                file,
                indent=4,
            )

        return filepath

    def save_trend(self, snapshot):

        filename = (
            snapshot["generated_at"]
            .replace(":", "-")
            + ".json"
        )

        filepath = self.trend_path / filename

        with open(filepath, "w", encoding="utf-8") as file:
            json.dump(
                snapshot,
                file,
                indent=4,
            )

        return filepath

    def load_latest_attention(self):

        files = sorted(
            self.attention_path.glob("*.json")
        )

        if not files:
            return None

        latest = files[-1]

        with open(latest, "r", encoding="utf-8") as file:
            return json.load(file)

    def load_latest_trend(self):

        files = sorted(
            self.trend_path.glob("*.json")
        )

        if not files:
            return None

        latest = files[-1]

        with open(latest, "r", encoding="utf-8") as file:
            return json.load(file)