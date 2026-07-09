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