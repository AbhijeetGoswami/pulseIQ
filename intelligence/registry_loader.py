#Football
from intelligence.registry.football.competitions import FOOTBALL_COMPETITIONS

from intelligence.registry.football.players import FOOTBALL_PLAYERS
from intelligence.registry.football.teams import FOOTBALL_TEAMS

# Formula 1
from intelligence.registry.formula1.competitions import FORMULA1_COMPETITIONS
from intelligence.registry.formula1.constructors import FORMULA1_CONSTRUCTORS
from intelligence.registry.formula1.drivers import FORMULA1_DRIVERS

# Cricket
from intelligence.registry.cricket.competitions import CRICKET_COMPETITIONS
from intelligence.registry.cricket.players import CRICKET_PLAYERS
from intelligence.registry.cricket.teams import CRICKET_TEAMS

# Tennis
from intelligence.registry.tennis.competitions import TENNIS_COMPETITIONS
from intelligence.registry.tennis.players import TENNIS_PLAYERS

# Rugby
from intelligence.registry.rugby.competitions import RUGBY_COMPETITIONS
from intelligence.registry.rugby.players import RUGBY_PLAYERS
from intelligence.registry.rugby.teams import RUGBY_TEAMS

# Golf
from intelligence.registry.golf.competitions import GOLF_COMPETITIONS
from intelligence.registry.golf.players import GOLF_PLAYERS

# Basketball
from intelligence.registry.basketball.competitions import BASKETBALL_COMPETITIONS
from intelligence.registry.basketball.players import BASKETBALL_PLAYERS
from intelligence.registry.basketball.teams import BASKETBALL_TEAMS

# Baseball
from intelligence.registry.baseball.competitions import BASEBALL_COMPETITIONS
from intelligence.registry.baseball.players import BASEBALL_PLAYERS
from intelligence.registry.baseball.teams import BASEBALL_TEAMS

# Ice Hockey
from intelligence.registry.icehockey.competitions import ICEHOCKEY_COMPETITIONS
from intelligence.registry.icehockey.players import ICEHOCKEY_PLAYERS
from intelligence.registry.icehockey.teams import ICEHOCKEY_TEAMS


class RegistryLoader:

    def __init__(self):

        # -------------------------------------------------
        # Load all registry entities
        # -------------------------------------------------

        registries = [

                    # -------------------------------------------------
                    # Football
                    # -------------------------------------------------

                    FOOTBALL_COMPETITIONS,
                    FOOTBALL_TEAMS,
                    FOOTBALL_PLAYERS,

                    # -------------------------------------------------
                    # Formula 1
                    # -------------------------------------------------

                    FORMULA1_COMPETITIONS,
                    FORMULA1_CONSTRUCTORS,
                    FORMULA1_DRIVERS,

                    # -------------------------------------------------
                    # Cricket
                    # -------------------------------------------------

                    CRICKET_COMPETITIONS,
                    CRICKET_TEAMS,
                    CRICKET_PLAYERS,

                    # -------------------------------------------------
                    # Tennis
                    # -------------------------------------------------

                    TENNIS_COMPETITIONS,
                    TENNIS_PLAYERS,

                    # -------------------------------------------------
                    # Rugby
                    # -------------------------------------------------

                    RUGBY_COMPETITIONS,
                    RUGBY_TEAMS,
                    RUGBY_PLAYERS,

                    # -------------------------------------------------
                    # Golf
                    # -------------------------------------------------

                    GOLF_COMPETITIONS,
                    GOLF_PLAYERS,

                    # -------------------------------------------------
                    # Basketball
                    # -------------------------------------------------

                    BASKETBALL_COMPETITIONS,
                    BASKETBALL_TEAMS,
                    BASKETBALL_PLAYERS,

                    # -------------------------------------------------
                    # Baseball
                    # -------------------------------------------------

                    BASEBALL_COMPETITIONS,
                    BASEBALL_TEAMS,
                    BASEBALL_PLAYERS,

                    # -------------------------------------------------
                    # Ice Hockey
                    # -------------------------------------------------

                    ICEHOCKEY_COMPETITIONS,
                    ICEHOCKEY_TEAMS,
                    ICEHOCKEY_PLAYERS,
                ]

        self._entities = []

        for registry in registries:
            self._entities.extend(registry)

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

    # -------------------------------------------------

    def get_all_aliases(self):

        return list(self._alias_index.keys())


# =====================================================
# Singleton Registry
# =====================================================

registry = RegistryLoader()