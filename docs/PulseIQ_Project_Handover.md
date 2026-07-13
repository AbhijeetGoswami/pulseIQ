# PulseIQ Project Handover

## Project

**PulseIQ** -- Continuous Intelligence Platform

## Vision

PulseIQ is a Continuous Intelligence Platform that continuously collects
information from external sources, extracts and resolves entities,
computes explainable Attention and Trend intelligence, persists
snapshots, and serves live dashboards through REST APIs.

The platform is designed to be extensible beyond Sports into Politics,
Technology, Finance, etc.

## Technology Stack

### Backend

-   Python
-   FastAPI
-   SQLite
-   APScheduler

### Frontend

-   React
-   Vite
-   Axios

## Current Architecture

``` text
APScheduler
    ↓
Automatic Collection
    ↓
collector.py
    ↓
Intelligence Pipeline
    ├── Attention Engine
    └── Trend Engine
          ↓
Snapshot Storage
    ↓
Snapshot APIs
    ↓
React Dashboard
    ↓
Auto Refresh (60s)
```

## Backend Status

### RSS Collector

-   RSS feed ingestion
-   Duplicate detection
-   Metrics
-   Collector run persistence

Endpoint: `POST /api/collect`

### Intelligence Engine

-   Entity Extraction
-   Registry Loader
-   Entity Resolution
-   Contextual Disambiguation
-   Batch Intelligence

### Attention Engine

-   Explainable Attention
-   Snapshot generation

### Trend Engine

-   Explainable Trend Detection
-   Snapshot generation

### Snapshot Storage

    storage/
      attention/
      trends/

### APIs

-   POST /api/collect
-   POST /api/intelligence/analyze
-   GET /api/attention/latest
-   GET /api/trends/latest

## Automation

APScheduler runs automatically on FastAPI startup.

Pipeline:

Scheduler → Collector → Intelligence → Attention → Trends → Snapshot
Persistence

Dashboard polls latest snapshots every 60 seconds.

## Frontend

Completed: - Dashboard - Entity Explorer - Attention Leaderboard - Trend
Leaderboard - Summary Cards - Live Snapshot Dashboard

## Architectural Decisions

-   Dashboard reads persisted snapshots only.
-   Dashboard performs no intelligence computation.
-   APScheduler drives the collection pipeline.
-   Scheduler does not call HTTP endpoints.
-   Hooks own polling; Dashboard is presentation-only.

## Completed Milestones

-   RSS Collection
-   Intelligence Engine
-   Attention Engine
-   Trend Engine
-   Snapshot Storage
-   Snapshot APIs
-   Live Dashboard
-   APScheduler
-   Automatic Snapshot Generation
-   Dashboard Polling

## Known Technical Debt

`collection_runner.py` currently duplicates collector orchestration.
This was intentionally accepted to keep `collector.py` stable while
introducing APScheduler.

## Next Epic

`feature/piq-platform-001-observability`

### Planned Work

-   Scheduler Health
-   Pipeline Health
-   Operations Status API
-   Platform Health Widget
-   Historical Intelligence
-   Explainability
-   Multi-source Intelligence
-   AI Insights

## Product Positioning

PulseIQ is a **Continuous Intelligence Platform**, not an RSS reader or
news aggregator.

## Notes for the Next Chat

The Continuous Intelligence Pipeline and Automation & Operations epics
are complete.

The platform now performs automatic collection, intelligence processing,
attention/trend snapshot generation, and dashboard auto-refresh.

1) The next focus is **Observability**.
2) To add a login Page with 2FA (OTP & Google Sign-In)
