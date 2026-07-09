from datetime import datetime, timezone


class TrendDetector:
    """
    PulseIQ Trend Detector

    Compares two Attention Snapshots and identifies
    how entity attention has changed over time.
    """

    SNAPSHOT_VERSION = 1

    def compare(self, previous_snapshot: dict, current_snapshot: dict):
        """
        Compare two Attention Snapshots.

        Returns a Trend Snapshot.
        """

        previous_entities = self._entity_map(previous_snapshot)
        current_entities = self._entity_map(current_snapshot)

        all_entity_ids = (
            set(previous_entities.keys())
            | set(current_entities.keys())
        )

        changes = []

        for entity_id in all_entity_ids:

            previous = previous_entities.get(entity_id)
            current = current_entities.get(entity_id)

            previous_score = (
                previous["attention_score"]
                if previous
                else 0.0
            )

            current_score = (
                current["attention_score"]
                if current
                else 0.0
            )

            delta = round(
                current_score - previous_score,
                2
            )

            if previous_score == 0 and current_score > 0:
                percent_change = 100.0
            elif previous_score > 0:
                percent_change = round(
                    (delta / previous_score) * 100,
                    2
                )
            else:
                percent_change = 0.0

            trend = self._trend_type(
                previous_score,
                current_score,
            )

            entity = current or previous

            if entity is None:
                continue

            changes.append(
                {
                    "id": entity["id"],
                    "value": entity["value"],
                    "type": entity["type"],
                    "sport": entity["sport"],

                    "previous_score": previous_score,
                    "current_score": current_score,

                    "score_change": delta,

                    "percent_change": percent_change,

                    "trend": trend,

                    "score_changes": self._score_changes(
                        previous,
                        current,
                    ),
                }
            )

        changes.sort(
                key=lambda item: abs(item["score_change"]),
                reverse=True,
            )

        return {
            "generated_at": datetime.now(
                timezone.utc
            ).isoformat(),
            "version": self.SNAPSHOT_VERSION,
            "trends": changes,
        }

    def _entity_map(self, snapshot):
        """
        Convert Attention Snapshot entities into
        an ID-indexed dictionary.
        """

        attention = snapshot.get("attention", {})

        entities = attention.get(
            "entities",
            []
        )

        return {
            entity["id"]: entity
            for entity in entities
        }

    def _trend_type(
        self,
        previous_score,
        current_score,
    ):
        """
        Determine trend direction.
        """

        if previous_score == 0 and current_score > 0:
            return "new"

        if previous_score > 0 and current_score == 0:
            return "disappeared"

        if current_score > previous_score:
            return "rising"

        if current_score < previous_score:
            return "falling"

        return "stable"
    
    def _score_changes(self, previous, current):
            """
            Compare individual score components between two entities.
            """

            previous_scores = (
                previous.get("scores", {})
                if previous
                else {}
            )

            current_scores = (
                current.get("scores", {})
                if current
                else {}
            )

            all_score_names = (
                set(previous_scores.keys())
                | set(current_scores.keys())
            )

            changes = {}

            for score_name in all_score_names:

                previous_value = previous_scores.get(
                    score_name,
                    0.0,
                )

                current_value = current_scores.get(
                    score_name,
                    0.0,
                )

                changes[score_name] = {
                    "previous": previous_value,
                    "current": current_value,
                    "change": round(
                        current_value - previous_value,
                        2,
                    ),
                }

            return changes