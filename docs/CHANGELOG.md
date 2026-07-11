----------------FRONTEND DIRECTORY MODIFICATION---------------

src/

assets/

components/
    ArticleTable/
    entities/
    layout/
    Loader/
    dashboard/      ⭐ NEW

dashboard/
    layouts/        ⭐ if currently unused

hooks/
    useArticles.js
    useDashboard.js
    useAttention.js ⭐
    useTrends.js    ⭐

pages/
    Dashboard.jsx
    Articles.jsx
    EntityExplorer.jsx
    Metrics.jsx

services/
    api.js
    entityService.js
    attentionService.js ⭐
    trendService.js ⭐
    intelligenceService.js ⭐

App.jsx
main.jsx

-----------------------------NEXT CAHNGE OVER UI ---------------------

┌─────────────────────────────────────────────────────────────────────────────┐
│                            PulseIQ Dashboard                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐               │
│  │ Articles   │ │ Entities   │ │ Domains    │ │ Categories │               │
│  │     6      │ │     9      │ │     1      │ │     4      │               │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘               │
│                                                                             │
├───────────────────────────────┬─────────────────────────────────────────────┤
│                               │                                             │
│  Attention Leaderboard        │ Trending Now                               │
│                               │                                             │
│  🥇 Messi              100    │ 🔥 Argentina        NEW                    │
│  🥈 Brazil              33    │ 📉 Brazil          Falling                 │
│  🥉 Argentina           33    │ ❌ Masters         Disappeared             │
│                               │                                             │
├───────────────────────────────┼─────────────────────────────────────────────┤
│                               │                                             │
│ Domains                       │ Categories                                 │
│                               │                                             │
│ Sports                        │ Football                                   │
│                               │ Basketball                                 │
│                               │ Golf                                       │
└───────────────────────────────┴─────────────────────────────────────────────┘

🏠 Dashboard

📊 Intelligence
    ├── Attention
    ├── Trends
    └── Explorer

⚙️ Pipeline

📈 Analytics

🔧 Settings

_______________NEXT UI CHANGE_________________________

┌──────────────────────────────────────────────────────────────────────────────┐
│ PulseIQ Dashboard                                             ● LIVE         │
│ Executive overview of current intelligence                              12:53│
├──────────────────────────────────────────────────────────────────────────────┤

┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ Articles   │ │ Entities   │ │ Domains    │ │ Categories │
│     6      │ │     9      │ │     1      │ │     4      │
└────────────┘ └────────────┘ └────────────┘ └────────────┘

┌──────────────────────────────────────────┬───────────────────────────────┐
│                                          │                               │
│ 🔥 Attention Leaderboard                 │  📈 Trending Now             │
│                                          │                               │
│ (large)                                 │ (compact cards)              │
│                                          │                               │
└──────────────────────────────────────────┴───────────────────────────────┘

┌──────────────────────────────┬──────────────────────────────────────────┐
│ Domain Distribution          │ Category Distribution                    │
└──────────────────────────────┴──────────────────────────────────────────┘