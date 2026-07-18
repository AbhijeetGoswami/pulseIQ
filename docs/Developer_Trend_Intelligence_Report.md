
# Developer Ready UI Specification

## Target Stack
- React 19 + Vite
- Tailwind CSS (or existing design system)
- Recharts / Nivo / ECharts for charts
- React Flow (entity network)
- Framer Motion (subtle animations)
- React Query for data fetching

## Design Tokens
- Grid: 12 columns
- Max content width: 1440px
- Content padding: 32px desktop / 24px tablet / 16px mobile
- Card radius: 16px
- Gap: 24px
- Section spacing: 32px
- Internal card padding: 24px


# Trend Intelligence Report

## Route
/entity/:entityId/trends

## API Dependencies
- GET /api/trends/{id}
- GET /api/trends/{id}/timeline
- GET /api/trends/{id}/events
- GET /api/trends/{id}/sources

## Component Tree

Page
├── HeroSection
├── ExecutiveSummary
├── TrendTimeline
├── RankMovement
├── TwoColumnLayout
│   ├── WhyTrending
│   └── TriggerEvents
├── TwoColumnLayout
│   ├── MomentumBreakdown
│   └── SourceContribution
├── TwoColumnLayout
│   ├── TrendNetwork
│   └── KeywordEvolution
├── CoverageTimeline
└── Metadata

## Grid

Hero 12
Summary 12
Timeline 12
Rank 4
Events 8
Momentum 6
Sources 6
Network 7
Keywords 5
Coverage 12

## Contracts

TrendTimeline
Inputs:
- time
- trendScore
- velocity
- rank

TriggerEvents
- timestamp
- event
- impact
- articleCount

KeywordEvolution
Columns:
Before | After

## States
Loading
No trend detected
Insufficient data
API failure

## Performance
Incremental timeline loading
Memoized charts
