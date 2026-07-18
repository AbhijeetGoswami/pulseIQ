
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


# Entity Profile

## Route
/entity/:entityId

## API Dependencies
- GET /api/entity/{id}
- GET /api/entity/{id}/history
- GET /api/entity/{id}/relationships
- GET /api/articles?entity={id}

## Component Tree

Page
├── HeroSection
├── OverviewCard
├── MetadataCard
├── TwoColumnLayout
│   ├── HistoricalAttention
│   └── HistoricalTrend
├── RelationshipGraph
├── ClassificationPanel
├── RelatedEntitiesGrid
├── StatisticsCards
├── RecentCoverage
└── ActionBar

## Grid

Hero 12
Overview 12
Metadata 12
Attention History 6
Trend History 6
Graph 8
Classification 4
Related 12
Stats 4 cards
Coverage 12

## Entity Model

Canonical Name
Aliases
Entity Type
Category
Sport
Registry ID
Country
Tags

## Actions

Watch Entity
Compare
Export
Open Articles

## States

Unknown entity
Merged entity
Deprecated entity
No historical data

## Future

Watchlists
Bookmarks
Cross-domain relationships
