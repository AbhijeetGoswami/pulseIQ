class AttentionScorer:
    """
    PulseIQ Attention Scorer

    Computes attention scores for ranked entities.

    Current scoring:
        - Mention Score (Normalized)

    Future scoring:
        - Recency
        - Source Diversity
        - Trend Velocity
        - Source Authority
        - Sentiment
    """

    def _mention_score(self, mentions, max_mentions):
        """
        Normalize mentions to a score between 0 and 100.
        """

        if max_mentions == 0:
            return 0.0

        return (mentions / max_mentions) * 100

    def _calculate_score(self, entity, max_mentions):
        """
        Calculate the final attention score for an entity.

        Future versions will combine multiple scoring signals.
        """

        return round(
            self._mention_score(
                entity["mentions"],
                max_mentions,
            ),
            2,
        )

    def score_entities(self, entities):
        """
        Enrich ranked entities with attention scores.

        Parameters
        ----------
        entities : list[dict]

        Returns
        -------
        list[dict]
        """



        if not entities:
            return entities

        max_mentions = max(
            entity["mentions"]
            for entity in entities
        )



        for entity in entities:

            entity["attention_score"] = self._calculate_score(
                entity,
                max_mentions,
            )

        return entities