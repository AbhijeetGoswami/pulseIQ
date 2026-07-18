# AttenBase Intelligence Workspace Redesign Plan

## Vision

AttenBase should evolve from a dashboard that **shows scores** into an **Attention Intelligence Platform** that **explains why those scores exist**.

The product should answer four distinct questions:

| User Question | Destination |
|---------------|-------------|
| What is happening right now? | Dashboard |
| What entities have the highest attention? | Attention Page |
| What entities are changing the fastest? | Trends Page |
| Tell me about a specific entity. | Entity Explorer |

---

# Information Architecture

```text
Dashboard
│
├── Attention Leaderboard
│       │
│       └── Attention Intelligence Report
│
├── Trending Leaderboard
│       │
│       └── Trend Intelligence Report
│
└── Entity Explorer
        │
        └── Entity Profile
```

---

# 1. Dashboard

Purpose:
Executive summary only.

Should answer:

> "What deserves my attention right now?"

The dashboard should remain lightweight.

Each card should redirect users into a deeper intelligence experience.

---

# 2. Attention Page

Purpose:

Answer:

> "Which entities currently have the highest attention?"

This page is a leaderboard, not an analysis page.

## Recommended Features

- Search
- Filters
    - Sport
    - Category
    - Entity Type
    - Attention Score
- Rank
- Attention Score
- Movement
- Last Updated
- Pagination

Clicking an entity opens:

> Attention Intelligence Report

---

# Attention Intelligence Report

Purpose:

Answer:

> "Why is this entity receiving attention?"

## Layout

### Hero

- Entity
- Category
- Attention Score
- Rank
- Movement
- Mentions
- Sources

---

### AI Executive Summary

A concise explanation generated from the explainable attention engine.

Example:

- Why the entity ranks highly
- What happened recently
- Main contributing topics

---

### Attention Timeline

Shows how attention evolved over time.

Questions answered:

- When did attention increase?
- Was the increase gradual or sudden?

---

### Attention Breakdown

Break the score into components.

Example

- Mentions
- Articles
- Source Diversity
- Velocity
- Trend Weight

---

### Why Is This Receiving Attention?

Key contributors

Examples

- Number of mentions
- Article growth
- Source growth
- Significant events
- Category impact

---

### Biggest Contributors

Example

- Lionel Messi
- FIFA
- Coach Interview
- Transfer Rumours

Contribution score beside each.

---

### Source Contribution

Visual:

Horizontal stacked bars

Example

- ESPN
- BBC
- Reuters
- Others

---

### Related Entity Network

Graph

Argentina

↓

Messi

↓

FIFA

↓

Brazil

Node Size

→ Mention Frequency

Edge Thickness

→ Relationship Strength

---

### Keyword Topics

Weighted chips instead of word cloud.

Examples

- Messi
- FIFA
- Copa America
- Goal
- Scaloni

Clickable filters.

---

### Geographic Coverage (Future)

Heat Map

Questions answered

Where is attention coming from?

---

### Related Entities

Cards

- Lionel Messi
- FIFA
- Brazil
- Spain

---

### Latest Coverage

Grouped news articles.

---

# 3. Trends Page

Purpose

Answer:

> "What is changing the fastest?"

Not a popularity page.

A momentum page.

---

## Recommended Columns

- Rank
- Entity
- Trend Direction
- Movement
- Previous Rank
- Current Rank
- Category

Click

↓

Trend Intelligence Report

---

# Trend Intelligence Report

Purpose

Answer

> "Why did this entity suddenly rise or fall?"

---

## Hero

- Entity
- Trend Score
- Rank Movement
- Current Position
- Previous Position

---

## AI Summary

Explain

- Why movement occurred
- Whether it is sustained
- Confidence

---

## Trend Timeline

Visual

Movement over time.

---

## Trigger Events

Timeline

Examples

- UEFA Announcement
- BBC Coverage
- Match Result
- Player Transfer

Each event contributes to trend movement.

---

## Momentum Breakdown

Explain movement

- New Articles
- New Mentions
- New Sources
- Mention Velocity

---

## Source Distribution

Source contribution bars.

---

## Related Entities

Network graph.

---

## Latest Coverage

Articles that caused the trend.

---

# 4. Entity Explorer

Purpose

Answer

> "Tell me everything about this entity."

This is the search entry point.

Not a leaderboard.

---

## Features

Search

Filters

- Sport
- Entity Type
- Category

Recently Viewed

Popular Searches

Saved Entities (Future)

---

# Entity Profile

Purpose

Knowledge page.

Contains

## Metadata

- Entity Name
- Sport
- Type
- Aliases
- Registry Information

## Historical Attention

Timeline

## Historical Trends

Timeline

## Related Entities

Graph

## Categories

## Recent Articles

## External Links (Future)

---

# Shared Design Language

All three reports should share the same visual structure.

1. Hero
2. AI Summary
3. Timeline
4. Breakdown
5. Contributors
6. Relationship Graph
7. Sources
8. Latest Coverage

Only the analysis changes.

---

# Roadmap

## Phase 1

- Refactor Attention Page into leaderboard
- Refactor Trends Page into leaderboard
- Improve Entity Explorer search
- Create Attention Intelligence Report

## Phase 2

- Trend Intelligence Report
- Entity Profile
- Timeline visualizations
- Source contribution charts

## Phase 3

- Entity relationship graph
- Geographic heatmap
- Saved watchlists
- Compare entities
- Historical playback
- Predictive attention insights

---

# Success Criteria

A user should be able to answer:

- What is important?
- Why is it important?
- What changed?
- Why did it change?
- Which entities are connected?
- Which sources caused it?
- How has it evolved?
- Should I care?

When those questions are answered naturally, AttenBase moves beyond analytics into an explainable Attention Intelligence platform.
