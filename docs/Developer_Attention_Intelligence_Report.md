
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


# Attention Intelligence Report

## Route
/entity/:entityId/attention

## API Dependencies
- GET /api/entity/{id}
- GET /api/attention/{id}
- GET /api/attention/{id}/timeline
- GET /api/attention/{id}/contributors
- GET /api/attention/{id}/sources
- GET /api/articles?entity={id}

## Component Tree

Page
├── PageHeader
├── HeroSection
├── ExecutiveSummaryCard
├── KPIGrid (5 cards)
├── AttentionTimelineChart
├── TwoColumnLayout
│   ├── AttentionBreakdownCard
│   └── WhyAttentionCard
├── TwoColumnLayout
│   ├── ContributorsList
│   └── SourceContributionChart
├── TwoColumnLayout
│   ├── EntityRelationshipGraph
│   └── KeywordTopics
├── RelatedEntities
├── LatestCoverageFeed
└── MetadataFooter

## Grid Layout

Hero             12 cols
Summary          12 cols
KPIs             5 equal cards
Timeline         12 cols
Breakdown        6 cols
Why             6 cols
Contributors     6 cols
Sources          6 cols
Graph            7 cols
Topics           5 cols
Related          12 cols
Coverage         12 cols

## Component Contracts

HeroSection
Inputs:
- entity
- attentionScore
- rank
- movement
- mentions
- sources
- updatedAt

TimelineChart
Inputs:
- timestamp
- attentionScore
- mentions

Interactions:
- hover tooltip
- zoom
- brush

CoverageFeed
Article card:
- publisher
- title
- timestamp
- sentiment
- Open button

## States
- Skeleton loading
- Empty state
- API error
- No timeline
- No contributors

## Performance
- Lazy-load graph
- Virtualize article feed
- Cache timeline
