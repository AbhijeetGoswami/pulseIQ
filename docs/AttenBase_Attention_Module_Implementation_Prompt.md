
# AttenBase – Developer Implementation Prompt
## Epic: Revamp Attention Module & Build Attention Intelligence Report

### Audience
This prompt is intended for AI coding assistants such as GitHub Copilot, Codex, Cursor, Claude Code, or similar.

---

# Project Context

AttenBase is an enterprise SaaS platform for **Attention Intelligence**.

The current Dashboard already contains a condensed Attention Leaderboard (Top 10). The Attention module must now become the complete exploration experience, while a new inner page will provide deep explainable intelligence for an individual entity.

Do **not** redesign the Dashboard.

---

# Objectives

Implement two deliverables:

1. Revamp the existing Attention Page.
2. Create the new Attention Intelligence Report as a detail page within the Attention module.

Target routes:

```text
/attention
/attention/:entityId
```

The report is NOT a standalone top-level navigation item.

---

# Existing Architecture

Frontend
- React + Vite
- Existing dashboard and routing
- Existing API service layer
- Existing theme system
- Existing leaderboard components should be reused where appropriate.

Backend
- Attention APIs already exist.
- Snapshot APIs already exist.
- Entity APIs already exist.

Prefer extending existing components instead of creating duplicates.

---

# Deliverable 1 – Revamp Attention Page

Purpose:

Enable users to explore the complete attention leaderboard.

## Layout

Header
Search
Filter Bar
Leaderboard Table
Pagination / Infinite Scroll

## Features

Search by entity

Filters

- Category
- Entity Type
- Sport / Domain
- Time Window (future-ready)

Sorting

- Attention Score
- Rank
- Mentions
- Movement

Leaderboard Columns

- Rank
- Entity
- Category
- Attention Score
- Movement
- Mentions
- Sources
- Updated

Every row must contain

Open Details

Clicking a row navigates to

```text
/attention/:entityId
```

Do not use modal dialogs.

---

# Deliverable 2 – Attention Intelligence Report

Purpose

Explain WHY an entity is receiving attention.

## Page Layout

Hero
Executive Summary
KPI Cards
Attention Timeline
Attention Breakdown
Why Receiving Attention
Top Contributors
Source Contribution
Relationship Network
Keyword Topics
Related Entities
Latest Coverage
Metadata Footer

---

# Component Tree

Page

├── Breadcrumb

├── HeroSection

├── AIExecutiveSummary

├── KPIGrid

├── AttentionTimeline

├── TwoColumnLayout

│      ├── BreakdownCard

│      └── ExplanationCard

├── Contributors

├── SourceContribution

├── RelationshipGraph

├── TopicCloud

├── RelatedEntities

├── CoverageFeed

└── MetadataFooter

---

# Component Requirements

Hero

Display

- Entity
- Category
- Rank
- Attention Score
- Mentions
- Sources
- Last Updated

AI Summary

Natural language explanation.

Timeline

Interactive

Support

- Hover
- Zoom
- Peak markers

Relationship Graph

Interactive

Node

Entity

Edge

Relationship strength

Coverage Feed

Card

Publisher

Headline

Published Time

Open Article

---

# Loading States

Every major component requires

- Skeleton Loader
- Empty State
- API Error State

---

# Performance

Lazy-load

- Relationship Graph

Virtualize

- Coverage Feed

Cache

- Timeline Data

Memoize expensive charts.

---

# Code Organization

Suggested structure

```text
src/
  pages/
    Attention/
      AttentionPage.jsx
      AttentionReport.jsx

  components/
    Attention/
      HeroSection/
      KPIGrid/
      AttentionTimeline/
      Contributors/
      Breakdown/
      SourceContribution/
      RelationshipGraph/
      TopicCloud/
      CoverageFeed/
      RelatedEntities/
      MetadataFooter/

  hooks/
    useAttention.js
    useAttentionTimeline.js

  services/
    attentionApi.js
```

---

# UX Principles

- Dashboard = Preview
- Attention Page = Exploration
- Attention Intelligence Report = Investigation

Never duplicate information across these pages.

Dashboard answers:

"What deserves my attention?"

Attention answers:

"What else is receiving attention?"

Attention Intelligence Report answers:

"Why is this entity receiving attention?"

---

# Success Criteria

- Reuse existing design system.
- Responsive desktop-first layout.
- Accessible components.
- Clean separation between exploration and analysis.
- Reusable component architecture for future Trend Intelligence Report.
- No breaking changes to existing Dashboard.

Implement incrementally with small, reviewable commits and preserve compatibility with existing APIs wherever possible.
