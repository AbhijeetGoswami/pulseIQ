                +------------------+
                | RSS Sources      |
                +---------+--------+
                          |
                          v
                +------------------+
                | Article Ingestor |
                +---------+--------+
                          |
                          v
                +------------------+
                | Intelligence     |
                | Engine           |
                +---------+--------+
                          |
                          v
                +------------------+
                | Attention Engine |
                +---------+--------+
                          |
                          v
                +------------------+
                | Trend Detector   |
                +---------+--------+
                          |
                          v
                +------------------+
                | Snapshot Store   |
                +---------+--------+
                          |
                 +--------+--------+
                 |                 |
                 v                 v
         Dashboard API       History API


         ------------------------NEXT EVOLVED TO BELOW -----------------------------------


                           PulseIQ

        ┌───────────────────────────┐
        │      RSS / Sources        │
        └──────────────┬────────────┘
                       │
                       ▼
             Article Ingestor
                       │
                       ▼
          Intelligence Pipeline
                       │
                       ▼
            Attention Pipeline
                       │
                       ▼
           Attention Snapshot
                       │
              ┌────────┴────────┐
              ▼                 ▼
      Snapshot Store     Trend Detector
              │                 │
              ▼                 ▼
      Attention History   Trend Snapshot
              │                 │
              └────────┬────────┘
                       ▼
                    REST APIs



                    -------------------FRONTE_END_VISION--------------

                    ┌───────────────────────────────────────────────┐
│               PulseIQ Dashboard               │
├───────────────────────────────────────────────┤
│                                               │
│ Articles Processed            1,254           │
│                                               │
│ Active Domains                  4             │
│                                               │
│ Top Categories                  Football      │
│                               Basketball      │
│                               Tennis          │
│                                               │
├───────────────────────────────────────────────┤
│                Attention Leaders              │
│                                               │
│ Messi                     ████████████ 100    │
│ Brazil                    ████████      67    │
│ Curry                     █████         42    │
│                                               │
├───────────────────────────────────────────────┤
│                Trending Now                   │
│                                               │
│ 🔥 Carlos Alcaraz         NEW                 │
│ 📈 Argentina              +42                 │
│ 📉 Brazil                 -25                 │
│ ❌ The Masters            disappeared         │
│                                               │
└───────────────────────────────────────────────┘

-----------------FOR LIVE DATA INTEGRATION=---------------------

pipeline/

    pipeline_runner.py
    scheduler.py

services/

    pipeline_service.py

api/

    routers/

        pipeline.py

        --------------------------()----------------------

        PulseIQ Main Branch
Data Collection
✅ RSS Collector
✅ Duplicate Detection
✅ Metrics
Intelligence
✅ Entity Extraction
✅ Registry Loader
✅ Contextual Disambiguation
✅ Entity Persistence
Attention
✅ Attention Engine
✅ Snapshot Generation
✅ Snapshot Persistence
Trends
✅ Trend Engine
✅ Snapshot Generation
✅ Snapshot Persistence
APIs
✅ Intelligence API
✅ Attention API
✅ Trend API
Dashboard
✅ Live Snapshot Dashboard
✅ No Dummy Data
Operations
✅ APScheduler
✅ Automatic Collection
✅ Automatic Snapshot Generation

That's an MVP you can genuinely demonstrate.