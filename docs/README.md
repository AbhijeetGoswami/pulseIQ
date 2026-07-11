# PulseIQ

> **An Attention Intelligence Platform that transforms fragmented
> information streams into structured, searchable, and actionable
> intelligence through entity-centric analysis.**

**Status:** Active Development 🚧

------------------------------------------------------------------------

## Overview

PulseIQ is an **Attention Intelligence Platform** designed to discover,
organize, and analyze information from multiple public sources to
understand **what is capturing attention**, **why it matters**, and
**how attention evolves over time**.

Unlike traditional news aggregators, PulseIQ is built around
**entities** rather than articles. Articles are treated as evidence,
while entities such as teams, competitions, companies, politicians,
products, and organizations become the primary objects of intelligence.

The platform is intentionally designed to be **source-agnostic**. RSS
feeds are the first ingestion source for the MVP, but the architecture
supports additional sources such as X (Twitter), Google News, Reddit,
YouTube, blogs, and other public information streams.

Updated**
PulseIQ is a Continuous Intelligence Platform that continuously collects information from external sources, resolves entities using domain-specific intelligence, computes explainable attention and trend scores, persists intelligence snapshots, and serves live dashboards through snapshot APIs.

------------------------------------------------------------------------

## Vision

PulseIQ aims to become an intelligence layer that answers questions such
as:

-   What is the world paying attention to right now?
-   Which entities are driving that attention?
-   How is attention changing over time?
-   Which topics are emerging?
-   How are different stories connected?

Rather than simply collecting information, PulseIQ transforms raw
content into structured intelligence.

------------------------------------------------------------------------

## MVP Scope

### Current Data Source

-   RSS Feeds

### Current Vertical

-   Sports

### Current Capabilities

-   RSS ingestion
-   Article normalization
-   Duplicate detection
-   Entity registry
-   Entity matching
-   Entity resolution
-   Article-to-entity mapping
-   REST API
-   Dashboard
-   Collector metrics

------------------------------------------------------------------------

## Future Data Sources

-   X (Twitter)
-   Google News
-   Reddit
-   YouTube
-   Blogs
-   Additional public information sources

------------------------------------------------------------------------

## Future Verticals

-   Politics
-   Technology
-   Business
-   Entertainment
-   Health
-   Science
-   Finance
-   Gaming

The intelligence engine is designed so that new sources and verticals
can be added without changing the overall architecture.

------------------------------------------------------------------------

## High-Level Architecture

``` text
               Information Sources
RSS • X • Google • Reddit • YouTube • Blogs
                     │
                     ▼
              Collection Layer
                     │
                     ▼
         Intelligence Pipeline
                     │
     ┌──────────────────────────────┐
     │ Classification               │
     │ Entity Matching              │
     │ Entity Resolution            │
     │ Attention Analysis           │
     │ Trend Detection              │
     └──────────────────────────────┘
                     │
                     ▼
            Persistence Layer
                     │
                     ▼
               FastAPI Backend
                     │
                     ▼
              React Dashboard
```

------------------------------------------------------------------------

## Technology Stack

### Backend

-   Python
-   FastAPI
-   SQLite
-   SQLAlchemy

### Frontend

-   React
-   Vite

### Data Collection

-   RSS feeds
-   Feedparser

------------------------------------------------------------------------

## Repository Structure

``` text
api/
collectors/
database/
docs/
frontend/
intelligence/
models/
schedulers/
tests/
utils/
```

------------------------------------------------------------------------

## Getting Started

1.  Clone the repository.
2.  Create a Python virtual environment.
3.  Install project dependencies.
4.  Configure environment variables.
5.  Initialize the database.
6.  Start the FastAPI server.
7.  Launch the React frontend.

Detailed setup instructions are available in `docs/DEVELOPMENT.md`.

------------------------------------------------------------------------

## Documentation

Project documentation is maintained under the `docs/` directory.

-   Vision
-   Architecture
-   Database
-   API
-   Intelligence Engine
-   Entity Registry
-   Development Guide
-   Roadmap
-   Changelog

------------------------------------------------------------------------

## Roadmap

### Phase 1 --- MVP

-   Sports RSS ingestion
-   Entity Explorer
-   Dashboard
-   REST API

### Phase 2

-   Multi-source ingestion
-   Improved entity extraction
-   Trend detection
-   Attention scoring

### Phase 3

-   Multi-vertical intelligence
-   Advanced analytics
-   AI-assisted insights
-   Predictive attention models

------------------------------------------------------------------------

## Design Principles

-   Source-agnostic architecture
-   Entity-centric intelligence
-   Modular components
-   Deterministic processing before AI
-   Extensible registry-based knowledge model
-   Clean separation between collection, intelligence, persistence, and
    presentation layers

------------------------------------------------------------------------

## Contributing

PulseIQ is under active development. Contributions should preserve the
modular architecture and maintain accompanying documentation for
significant architectural changes.

------------------------------------------------------------------------

## License

License information will be added as the project evolves.
