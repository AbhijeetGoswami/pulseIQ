def longest_match(text: str, candidates: list[str]) -> list[str]:

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