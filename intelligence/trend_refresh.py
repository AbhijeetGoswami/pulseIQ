from intelligence.snapshot_store import SnapshotStore
from intelligence.trend_detector import TrendDetector


class TrendRefresh:
    """
    Refreshes the Trend Snapshot using the two latest
    Attention Snapshots.
    """

    def __init__(self):
        self.store = SnapshotStore()
        self.detector = TrendDetector()

    def run(self):

        previous_snapshot, current_snapshot = (
            self.store.get_latest_two_attention_snapshots()
        )

        if previous_snapshot is None or current_snapshot is None:
            print("Not enough Attention Snapshots to calculate trends.")
            return None

        trend_snapshot = self.detector.compare(
            previous_snapshot,
            current_snapshot,
        )

        self.store.save_trend(
            trend_snapshot
        )

        print("Trend Snapshot Refreshed")

        return trend_snapshot