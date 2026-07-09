class AttentionScorer:
    """
    PulseIQ Attention Scorer

    Computes attention scores for ranked entities.

    Current signals:
        - Mention Score

    Planned signals:
        - Recency Score
        - Source Diversity
        - Trend Velocity
        - Source Authority
        - Sentiment
    """

    # -------------------------------------------------------
    # Individual Score Components
    # -------------------------------------------------------

    def _mention_score(self, mentions, max_mentions):
        """
        Normalize mention count to 0-100.
        """

        if max_mentions == 0:
            return 0.0

        return round((mentions / max_mentions) * 100, 2)

    # -------------------------------------------------------
    # Score Builder
    # -------------------------------------------------------

    def _build_scores(self, entity, max_mentions):
        """
        Build all individual scoring components.

        Future versions will add:
            - recency
            - diversity
            - velocity
            - authority
            - sentiment
        """

        return {
            "mention": self._mention_score(
                entity["mentions"],
                max_mentions,
            )
        }

    # -------------------------------------------------------
    # Final Score
    # -------------------------------------------------------

    def _calculate_attention_score(self, scores):
        """
        Calculate the overall attention score.

        V1:
            Attention Score = Mention Score

        Future:
            Weighted combination of multiple signals.
        """

        return scores["mention"]

    # -------------------------------------------------------
    # Entity Scoring
    # -------------------------------------------------------

    def _score_entity(self, entity, max_mentions):
        """
        Score a single entity.
        """

        scores = self._build_scores(
            entity,
            max_mentions,
        )

        entity["scores"] = scores

        entity["attention_score"] = self._calculate_attention_score(
            scores
        )

        return entity

    # -------------------------------------------------------
    # Public API
    # -------------------------------------------------------

    def score_entities(self, entities):
        """
        Enrich ranked entities with attention scores.
        """

        if not entities:
            return entities

        max_mentions = max(
            entity["mentions"]
            for entity in entities
        )

        for entity in entities:

            self._score_entity(
                entity,
                max_mentions,
            )

        return entities