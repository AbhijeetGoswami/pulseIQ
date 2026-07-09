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