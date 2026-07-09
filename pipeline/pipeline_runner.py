from pipeline.article_ingestor import ArticleIngestor
from pipeline.snapshot_store import SnapshotStore

from intelligence.attention_pipeline import AttentionPipeline
from intelligence.trend_detector import TrendDetector


class PipelineRunner:
    """
    PulseIQ Pipeline Runner

    Orchestrates the complete intelligence pipeline.
    """

    def __init__(self):

        self.ingestor = ArticleIngestor()

        self.attention = AttentionPipeline()

        self.store = SnapshotStore()

        self.trends = TrendDetector()

    def run(self, articles):
        """
        Execute one complete pipeline run.
        """

        titles = self.ingestor.ingest(
            articles
        )

        attention_snapshot = (
            self.attention.analyze_batch(
                titles
            )
        )

        previous_snapshot = (
            self.store.load_latest_attention()
        )

        trend_snapshot = None
        trend_file = None

        if previous_snapshot:

            trend_snapshot = (
                self.trends.compare(
                    previous_snapshot,
                    attention_snapshot,
                )
            )

            trend_file = self.store.save_trend(
                trend_snapshot
            )

        attention_file = self.store.save_attention(
            attention_snapshot
        )

        return {
            "status": "completed",
            "articles_processed": len(titles),
            "generated_at": attention_snapshot["generated_at"],

            "attention_file": str(attention_file),
            "trend_file": (
                str(trend_file)
                if trend_file
                else None
            ),

            "attention_snapshot": attention_snapshot,
            "trend_snapshot": trend_snapshot,
        }