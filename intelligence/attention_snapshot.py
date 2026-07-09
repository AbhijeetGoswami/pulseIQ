from datetime import datetime, timezone


class AttentionSnapshot:
    """
    Represents a single execution of the PulseIQ
    Attention Engine.

    Future versions may persist snapshots to
    databases, object storage or cache.
    """

    SNAPSHOT_VERSION = 1

    def create(self, attention_result, generated_at=None):
        """
        Wrap an attention result with snapshot metadata.
        """

        if generated_at is None:
            generated_at = datetime.now(timezone.utc)

        return {
            "generated_at": generated_at.isoformat(),
            "version": self.SNAPSHOT_VERSION,
            "attention": attention_result,
        }