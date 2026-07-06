from collections import Counter


def resolve_entities(matches: list[dict]) -> list[dict]:
    """
    Resolve ambiguous entities using sport consensus.

    Input:
        Candidate entities from entity_matcher.py

    Output:
        Canonical resolved entities.
    """

    resolved = []

    sport_counter = Counter()

    # -----------------------------
    # Count candidate sports
    # -----------------------------

    for match in matches:

        candidates = match["candidates"]

        if len(candidates) == 1:

            sport_counter[
                candidates[0]["sport"]
            ] += 1

    # -----------------------------
    # Determine dominant sport
    # -----------------------------

    dominant_sport = None

    if sport_counter:

        dominant_sport = sport_counter.most_common(1)[0][0]

    # -----------------------------
    # Resolve every candidate
    # -----------------------------

    for match in matches:

        candidates = match["candidates"]

        if len(candidates) == 1:

            resolved.append(candidates[0])

            continue

        if dominant_sport:

            for candidate in candidates:

                if candidate["sport"] == dominant_sport:

                    resolved.append(candidate)

                    break

    return resolved