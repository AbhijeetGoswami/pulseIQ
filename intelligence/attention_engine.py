from collections import Counter
import datetime
from time import timezone
from intelligence.attention_scorer import AttentionScorer
from intelligence.attention_snapshot import AttentionSnapshot


class AttentionEngine:
    """
    PulseIQ Attention Engine

    Aggregates analyzed articles into attention statistics.

    Current outputs:
        - Summary
        - Ranked Entities

    Future outputs:
        - Domains
        - Categories
        - Entity Types
        - Attention Scores
        - Trends
    """

    def __init__(self):
        self._reset()

    def _reset(self):
        """Reset all internal state before a new calculation."""

        self.entity_counter = Counter()
        self.type_counter = Counter()
        self.category_counter = Counter()
        self.domain_counter = Counter()

        self.entity_map = {}
        self.category_map = {}
        self.domain_map = {}

    def _register_entity(self, entity):
        """
        Register a single resolved entity.
        """

        entity_id = entity["id"]

        # -----------------------------
        # Entity Counter
        # -----------------------------

        self.entity_counter[entity_id] += 1

        # -----------------------------
        # Entity Type Counter
        # -----------------------------

        entity_type = entity["type"]

        self.type_counter[entity_type] += 1

        # -----------------------------
        # Category Counter
        #
        # Today:
        #   category -> sport
        #
        # Tomorrow:
        #   category -> Football
        #   category -> AI
        #   category -> Elections
        # -----------------------------

        category = entity.get(
            "category",
            entity.get("sport", "Unknown")
        )

        self.category_counter[category] += 1

        self.category_map[category] = {
            "id": category.lower().replace(" ", "_"),
            "name": category,
            "domain": entity.get("domain", "Sports"),
        }

        # -----------------------------
        # Domain Counter
        #
        # Default to Sports until
        # registries introduce
        # explicit domains.
        # -----------------------------

        domain = entity.get(
            "domain",
            "Sports"
        )

        self.domain_counter[domain] += 1

        self.domain_map[domain] = {
            "id": domain.lower().replace(" ", "_"),
            "name": domain,
        }

        # Save metadata for ranking

        self.entity_map[entity_id] = entity

    def _rank_entities(self):
        """
        Return ranked entities by mention count.
        """

        ranked = []

        for entity_id, mentions in self.entity_counter.most_common():

            entity = self.entity_map[entity_id].copy()

            entity["mentions"] = mentions

            ranked.append(entity)

        return ranked

    def _rank_counter(self, counter, metadata_map=None):
        """
        Convert any Counter into a ranked list.
        """

        ranked = []

        for key, mentions in counter.most_common():

            item = {
                "name": key,
                "mentions": mentions,
            }

            if metadata_map and key in metadata_map:
                item.update(metadata_map[key])

            ranked.append(item)

        return ranked
    
    def create(self, attention_result, generated_at=None):
     generated_at = generated_at or datetime.timezone.utc

    def calculate(self, analyses):
        """
        Calculate attention statistics.

        Parameters
        ----------
        analyses : list[dict]

        Returns
        -------
        {
            "summary": {...},
            "entities": [...]
        }
        """

        # ----------------------------------------
        # Start fresh for every calculation
        # ----------------------------------------

        self._reset()

        # ----------------------------------------
        # Register every resolved entity
        # ----------------------------------------

        for analysis in analyses:

            for entity in analysis["entities"]:

                self._register_entity(entity)

        # ----------------------------------------
        # Summary
        # ----------------------------------------

        summary = {
            "total_articles": len(analyses),
            "unique_entities": len(self.entity_counter),
            "total_mentions": sum(self.entity_counter.values()),
        }

        # ----------------------------------------
        # Rank entities
        # ----------------------------------------

        ranked_entities = self._rank_entities()

        # ----------------------------------------
        # Apply attention scoring
        # ----------------------------------------

        scorer = AttentionScorer()

        ranked_entities = scorer.score_entities(
            ranked_entities
        )

        # ----------------------------------------
        # Apply attention snapshot
        # ----------------------------------------

        snapshot = AttentionSnapshot()

        # ----------------------------------------
        # Final Result
        # ----------------------------------------

        result = {

            "summary": summary,

            "domains": self._rank_counter(
                self.domain_counter,
                self.domain_map,
            ),

            "categories": self._rank_counter(
                self.category_counter,
                self.category_map,
            ),

            "entity_types": self._group_entities_by_type(
                ranked_entities
            ),

            "entities": ranked_entities,
        }

        # ----------------------------------------
        # Wrap inside an Attention Snapshot
        # ----------------------------------------

        snapshot = AttentionSnapshot()

        return snapshot.create(result)
    
    def _group_entities_by_type(self, ranked_entities):
        """
        Group ranked entities by entity type.

        Returns
        -------
        {
            "player": [...],
            "team": [...],
            ...
        }
        """

        grouped = {}

        for entity in ranked_entities:

            entity_type = entity["type"]

            grouped.setdefault(entity_type, []).append(entity)

        return grouped