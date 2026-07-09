from intelligence.attention_pipeline import AttentionPipeline
from intelligence.trend_detector import TrendDetector


class TrendPipeline:
    """
    PulseIQ Trend Pipeline

    Generates two Attention Snapshots
    and compares them using the Trend Detector.
    """

    def __init__(self):
        self.attention = AttentionPipeline()
        self.detector = TrendDetector()

    def compare(self, previous_titles, current_titles):

        previous_snapshot = self.attention.analyze_batch(
            previous_titles
        )

        current_snapshot = self.attention.analyze_batch(
            current_titles
        )

        return self.detector.compare(
            previous_snapshot,
            current_snapshot,
        )