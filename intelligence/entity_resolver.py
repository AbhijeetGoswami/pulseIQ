from collections import Counter


def resolve_entities(matches):
    """
    Resolve matched entities using contextual sport disambiguation.
    """

    resolved = []
    ambiguous = []

    sport_counter = Counter()

    # -------------------------------------------------
    # Pass 1 : Resolve unambiguous aliases
    # -------------------------------------------------

    for match in matches:

        candidates = match["candidates"]

        if not candidates:
            continue

        if len(candidates) == 1:

            entity = candidates[0]

            resolved.append(entity)

            sport_counter[entity["sport"]] += 1

        else:

            ambiguous.append(match)

    # -------------------------------------------------
    # Determine dominant sport
    # -------------------------------------------------

    dominant_sport = None

    if sport_counter:
        
        dominant_sport = sport_counter.most_common(1)[0][0]

    # -------------------------------------------------
    # Pass 2 : Resolve ambiguous aliases
    # -------------------------------------------------

    for match in ambiguous:

        candidates = match["candidates"]

        chosen = None

        if dominant_sport:

            for candidate in candidates:

                if candidate["sport"] == dominant_sport:
                    chosen = candidate
                    break

        if chosen is None:
            chosen = candidates[0]

        resolved.append(chosen)

    return resolved