from intelligence.registry_loader import RegistryLoader
import re

loader = RegistryLoader()

def longest_match(text: str, candidates: list[str]) -> list[str]:
    """
    Return the longest non-overlapping whole-word/phrase matches.
    """

    matches = []

    working_text = text.lower()

    candidates = sorted(
        candidates,
        key=len,
        reverse=True
    )

    for candidate in candidates:

        candidate_lower = candidate.lower()

        pattern = r"\b" + re.escape(candidate_lower) + r"\b"

        match = re.search(pattern, working_text)

        if match:

            matches.append(candidate)

            start, end = match.span()

            working_text = (
                working_text[:start]
                + (" " * (end - start))
                + working_text[end:]
            )

    return matches


def match_entities(title: str) -> list[dict]:
    """
    Resolve candidate entities from a news title.

    The matcher does NOT choose the final entity.
    It only returns every possible candidate.
    """

    aliases = list(loader._alias_index.keys())

    matched_aliases = longest_match(
        title,
        aliases
    )

    results = []

    for alias in matched_aliases:

        results.append(
            {
                "matched_alias": alias,

                "candidates": loader.get_entities_by_alias(alias),

                "confidence": 1.0,
            }
        )

    return results