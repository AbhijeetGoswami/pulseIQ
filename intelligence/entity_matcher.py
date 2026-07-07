from intelligence.registry_loader import RegistryLoader


loader = RegistryLoader()


def longest_match(text: str, candidates: list[str]) -> list[str]:
    """
    Return the longest non-overlapping matches from a list of candidates.
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

        if candidate_lower in working_text:

            matches.append(candidate)

            working_text = working_text.replace(
                candidate_lower,
                " " * len(candidate_lower),
                1
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