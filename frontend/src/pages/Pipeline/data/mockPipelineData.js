export const pipelineStatus = {
    status: "Healthy",
    scheduler: "Running",
    autoRefresh: "Enabled",
    lastRun: "2 minutes ago",
    nextRun: "13 minutes",
};

export const pipelineStats = [
    {
        title: "Sources",
        value: 18,
        icon: "📰",
        color: "#2563eb",
    },
    {
        title: "Articles",
        value: 342,
        icon: "📄",
        color: "#16a34a",
    },
    {
        title: "Runs Today",
        value: 31,
        icon: "▶",
        color: "#f59e0b",
    },
    {
        title: "Failures",
        value: 0,
        icon: "⚠",
        color: "#dc2626",
    },
];

export const sourceHealth = [
    {
        source: "ESPN",
        status: "Healthy",
        articles: 42,
        lastSuccess: "2 min ago",
    },
    {
        source: "BBC Sport",
        status: "Healthy",
        articles: 28,
        lastSuccess: "4 min ago",
    },
    {
        source: "FIFA",
        status: "Warning",
        articles: 0,
        lastSuccess: "43 min ago",
    },
    {
        source: "Formula 1",
        status: "Healthy",
        articles: 16,
        lastSuccess: "3 min ago",
    },
    {
        source: "NBA",
        status: "Failed",
        articles: 0,
        lastSuccess: "Yesterday",
    },
];

export const pipelineRuns = [
    {
        id: 245,
        status: "Success",
        duration: "14 sec",
        articles: 332,
        started: "18:31",
    },
    {
        id: 244,
        status: "Success",
        duration: "12 sec",
        articles: 319,
        started: "18:16",
    },
    {
        id: 243,
        status: "Partial",
        duration: "17 sec",
        articles: 281,
        started: "18:01",
    },
    {
        id: 242,
        status: "Failed",
        duration: "8 sec",
        articles: 0,
        started: "17:46",
    },
];

export const pipelineLogs = [
    "18:31:01  Collector started.",
    "18:31:04  ESPN fetched 42 articles.",
    "18:31:06  BBC Sport fetched 28 articles.",
    "18:31:10  Intelligence Engine completed.",
    "18:31:12  Attention Snapshot generated.",
    "18:31:14  Trend Snapshot generated.",
    "18:31:15  Snapshot persisted.",
    "18:31:16  Pipeline completed successfully.",
];