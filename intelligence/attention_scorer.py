class AttentionScorer:
    """
    PulseIQ Attention Scorer

    Converts entity mention counts into normalized
    attention scores (0-100).

    Future versions will incorporate:

    - Recency
    - Source Diversity
    - Trend Velocity
    - Source Authority
    - Sentiment
    """

    def score(self, attention_result: dict) -> dict:
        """
        Enrich entities with an attention score.

        Parameters
        ----------
        attention_result : dict

        Returns
        -------
        dict
        """

        entities = attention_result.get("entities", [])

        if not entities:
            return attention_result

        max_mentions = max(
            entity["mentions"]
            for entity in entities
        )

        if max_mentions == 0:
            max_mentions = 1

        for entity in entities:

            score = (
                entity["mentions"] / max_mentions
            ) * 100

            entity["attention_score"] = round(score, 2)

        return attention_result