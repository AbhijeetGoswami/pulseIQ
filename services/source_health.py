from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

from models.rss_fetch_result import RSSFetchResult


class SourceHealthService:
    """
    Persists connector health reports.

    Produces:

        storage/source_health/latest.json

    and

        storage/source_health/history/*.json
    """

    STORAGE_DIR = Path("storage/source_health")

    HISTORY_DIR = STORAGE_DIR / "history"

    LATEST_FILE = STORAGE_DIR / "latest.json"

    def __init__(self):

        self.STORAGE_DIR.mkdir(
            parents=True,
            exist_ok=True,
        )

        self.HISTORY_DIR.mkdir(
            parents=True,
            exist_ok=True,
        )

    # ---------------------------------------------------------

    def save(
        self,
        results: list[RSSFetchResult],
    ) -> dict:

        generated_at = datetime.utcnow().isoformat()

        report = {

            "generated_at": generated_at,

            "summary": {

                "sources": len(results),

                "healthy": sum(
                    r.success for r in results
                ),

                "failed": sum(
                    not r.success for r in results
                ),

                "articles": sum(
                    r.article_count
                    for r in results
                ),
            },

            "sources": [
                self._serialize(r)
                for r in sorted(
                    results,
                    key=lambda x: x.source.priority
                )
            ],
        }

        with open(
            self.LATEST_FILE,
            "w",
            encoding="utf-8",
        ) as fp:

            json.dump(
                report,
                fp,
                indent=2,
                ensure_ascii=False,
            )

        history_file = (
            self.HISTORY_DIR
            / f"{generated_at.replace(':','-')}.json"
        )

        with open(
            history_file,
            "w",
            encoding="utf-8",
        ) as fp:

            json.dump(
                report,
                fp,
                indent=2,
                ensure_ascii=False,
            )

        return report

    # ---------------------------------------------------------

    def latest(self) -> dict:

        if not self.LATEST_FILE.exists():
            return {}

        with open(
            self.LATEST_FILE,
            encoding="utf-8",
        ) as fp:

            return json.load(fp)

    # ---------------------------------------------------------

    @staticmethod
    def _serialize(
        result: RSSFetchResult,
    ) -> dict:

        return {

            "id": result.source.id,

            "name": result.source.name,

            "connector": result.source.source_type,

            "country": result.source.country,

            "sport": result.source.sport,

            "provider": result.source.provider,

            "priority": result.source.priority,

            "status": result.status,

            "articles": result.article_count,

            "duration_ms": result.duration_ms,

            "http_status": result.http_status,

            "parser_warning": result.parser_warning,

            "error": result.error,
        }