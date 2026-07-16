from pathlib import Path
from typing import Dict, List, Optional

import yaml

from models.rss_source import RSSSource


class SourceRegistry:
    """
    Loads and manages RSS/news source configurations.

    The registry is responsible for:

    - Loading source definitions from YAML
    - Validating required fields
    - Returning RSSSource objects
    - Filtering enabled sources
    - Looking up sources by id
    """

    DEFAULT_CONFIG_DIR = (
        Path(__file__).resolve().parent / "rss"
    )

    def __init__(self, config_dir: Optional[Path] = None):

        self.config_dir = (
            Path(config_dir)
            if config_dir
            else self.DEFAULT_CONFIG_DIR
        )

        self._sources: Dict[str, RSSSource] = {}

        self.reload()

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def reload(self):

        """
        Reload all YAML source definitions.
        """

        self._sources.clear()

        if not self.config_dir.exists():
            raise FileNotFoundError(
                f"RSS configuration directory not found: "
                f"{self.config_dir}"
            )

        yaml_files = sorted(
            self.config_dir.glob("*.yaml")
        )

        for yaml_file in yaml_files:

            self._load_yaml(yaml_file)

    def all_sources(self) -> List[RSSSource]:

        return sorted(
            self._sources.values(),
            key=lambda s: s.priority
        )

    def enabled_sources(self) -> List[RSSSource]:

        return [
            source
            for source in self.all_sources()
            if source.enabled
        ]

    def disabled_sources(self) -> List[RSSSource]:

        return [
            source
            for source in self.all_sources()
            if not source.enabled
        ]

    def by_country(
        self,
        country: str
    ) -> List[RSSSource]:

        return [
            source
            for source in self.enabled_sources()
            if source.country.lower() == country.lower()
        ]

    def by_sport(
        self,
        sport: str
    ) -> List[RSSSource]:

        return [
            source
            for source in self.enabled_sources()
            if source.sport.lower() == sport.lower()
        ]

    def get(
        self,
        source_id: str
    ) -> Optional[RSSSource]:

        return self._sources.get(source_id)

    # ------------------------------------------------------------------
    # Internal
    # ------------------------------------------------------------------

    def _load_yaml(
        self,
        yaml_file: Path
    ):

        with yaml_file.open(
            "r",
            encoding="utf-8"
        ) as stream:

            data = yaml.safe_load(stream) or {}

        sources = data.get("sources", [])

        if not isinstance(sources, list):

            raise ValueError(
                f"'sources' must be a list "
                f"in {yaml_file.name}"
            )

        for item in sources:

            self._validate(item, yaml_file)

            source = RSSSource.from_dict(item)

            if source.id in self._sources:

                raise ValueError(
                    f"Duplicate source id "
                    f"'{source.id}' "
                    f"in {yaml_file.name}"
                )

            self._sources[source.id] = source

    @staticmethod
    def _validate(
        item: dict,
        yaml_file: Path
    ):

        required = [
            "id",
            "name",
            "url"
        ]

        missing = [
            field
            for field in required
            if field not in item
        ]

        if missing:

            raise ValueError(
                f"{yaml_file.name}: "
                f"Missing required field(s): "
                f"{', '.join(missing)}"
            )