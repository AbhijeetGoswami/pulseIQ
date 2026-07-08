I like giving them stable IDs. They'll make your GitHub issues, PRs, and changelog much cleaner.

Since this is the Intelligence Engine MVP, I'd use the prefix PIQ-INT (PulseIQ Intelligence).

ID	Priority	Problem	Current Impact
PIQ-INT-001	🔴 Critical	Incorrect Sport Classification	Articles are classified into the wrong sport (e.g., NHL article classified as Football).
PIQ-INT-002	🔴 Critical	Incomplete Sport Classification Coverage	Many valid sports (F1, WWE, NBA, Baseball, Tennis, MMA, NHL, etc.) become Unknown.
DONE**--PIQ-INT-003	🔴 Critical	Sport Determination Relies on Keyword Classification	Sport is inferred directly from text instead of resolved entities, reducing accuracy.
PIQ-INT-004	🟠 High	Entity Registry Coverage Gaps	Registry lacks players, drivers, managers, venues, etc., limiting entity resolution.
PIQ-INT-005	🟠 High	Mixed-Content Source Pollution	Sources like Sportskeeda publish Gaming/Anime/etc., but non-sports articles enter the sports pipeline.
PIQ-INT-006	🟠 High	Category Classification Not Implemented	category remains NULL for all articles, preventing meaningful grouping and filtering.
PIQ-INT-007	🟡 Medium	No Confidence Scoring	Sport/entity decisions provide no confidence value, making debugging and quality analysis difficult.
PIQ-INT-008	🟡 Medium	Pipeline Not Fully Entity-Centric	Intelligence pipeline doesn't yet derive all metadata (sport, category) from resolved entities.
PIQ-INT-009	🟡 Medium	Registry Scalability	Registry organization needs to support additional sports and future verticals without structural changes.
PIQ-INT-010	🟢 Enhancement	Attention Signals Not Yet Computed	Articles are stored, but attention scores and trend indicators are not yet generated.
I would group them into milestones
🎯 Milestone 1 — Classification Accuracy
PIQ-INT-001
PIQ-INT-002
PIQ-INT-003

Goal: Every article gets the correct sport.

🎯 Milestone 2 — Entity Intelligence
PIQ-INT-004
PIQ-INT-008
PIQ-INT-009

Goal: Make the registry the primary source of truth.

🎯 Milestone 3 — Metadata Enrichment
PIQ-INT-005
PIQ-INT-006
PIQ-INT-007

Goal: Improve article quality and filtering.

🎯 Milestone 4 — Attention Intelligence
PIQ-INT-010

Goal: Transform classified articles into actionable intelligence.

One suggestion for future issue IDs

Since PulseIQ will grow, I'd use a consistent convention across the project:

Prefix	Module
PIQ-INT-###	Intelligence Engine
PIQ-API-###	API
PIQ-DB-###	Database
PIQ-FE-###	Frontend
PIQ-COL-###	Collectors
PIQ-ENT-###	Entity Explorer
PIQ-DOC-###	Documentation
PIQ-OPS-###	Deployment / CI / Scheduling

This gives every issue a unique, descriptive identifier and makes it easy to track work across the platform as PulseIQ evolves.