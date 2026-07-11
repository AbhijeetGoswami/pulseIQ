from database.entity_repo import get_recent_article_analyses
from intelligence.attention_engine import AttentionEngine
from intelligence.snapshot_store import SnapshotStore


class AttentionRefresh:
    """
    Refreshes the latest Attention Snapshot from
    persisted article intelligence.

    Flow

    article_entities
            ↓
    get_recent_article_analyses()
            ↓
    AttentionEngine
            ↓
    SnapshotStore
    """

    def __init__(self):
        self.engine = AttentionEngine()
        self.store = SnapshotStore()

    def run(self, hours: int = 24):

        analyses = get_recent_article_analyses(hours)

        snapshot = self.engine.calculate(
            analyses
        )

        self.store.save_attention(snapshot)

        return snapshot