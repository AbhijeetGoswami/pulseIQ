from intelligence.registry.football.competitions import FOOTBALL_COMPETITIONS
from intelligence.registry.football.teams import FOOTBALL_TEAMS

from intelligence.registry.cricket.competitions import CRICKET_COMPETITIONS
from intelligence.registry.cricket.teams import CRICKET_TEAMS

from intelligence.registry.tennis.competitions import TENNIS_COMPETITIONS


class RegistryLoader:

    def __init__(self):

        # -------------------------------------------------
        # Load all registry entities
        # -------------------------------------------------

        self._entities = []

        self._entities.extend(FOOTBALL_COMPETITIONS)
        self._entities.extend(FOOTBALL_TEAMS)

        self._entities.extend(CRICKET_COMPETITIONS)
        self._entities.extend(CRICKET_TEAMS)

        self._entities.extend(TENNIS_COMPETITIONS)

        # -------------------------------------------------
        # Build indexes
        # -------------------------------------------------

        self._by_id = {}

        self._by_type = {}

        self._by_sport = {}

        self._alias_index = {}

        for entity in self._entities:

            # ---------------- ID ----------------

            self._by_id[entity["id"]] = entity

            # ---------------- TYPE ----------------

            self._by_type.setdefault(
                entity["type"],
                []
            ).append(entity)

            # ---------------- SPORT ----------------

            self._by_sport.setdefault(
                entity["sport"],
                []
            ).append(entity)

            # ---------------- ALIASES ----------------

            for alias in entity["aliases"]:

                self._alias_index.setdefault(
                    alias.lower(),
                    []
                ).append(entity)

    # -------------------------------------------------

    def get_all_entities(self):

        return self._entities

    # -------------------------------------------------

    def get_entity_by_id(self, entity_id: str):

        return self._by_id.get(entity_id)

    # -------------------------------------------------

    def get_entities_by_type(self, entity_type: str):

        return self._by_type.get(entity_type, [])

    # -------------------------------------------------

    def get_entities_by_sport(self, sport: str):

        return self._by_sport.get(sport, [])

    # -------------------------------------------------

    def get_entities_by_alias(self, alias: str):

        return self._alias_index.get(
            alias.lower(),
            []
        )


# =====================================================
# Singleton Registry
# =====================================================

registry = RegistryLoader()