import "./AttentionStats.css";

const formatLastUpdated = (value) => {
  if (!value) return null;

  try {
    const updated = new Date(value);
    const now = new Date();

    const diffSeconds = Math.floor((now - updated) / 1000);

    if (diffSeconds < 60) return "Just now";

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes} min ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hr ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } catch {
    return null;
  }
};

export default function AttentionStats({
  mentions,
  articles,
  lastSeen,
}) {
  const updated = formatLastUpdated(lastSeen);

  return (
    <div className="attention-stats">
      {mentions !== undefined && (
        <span className="stats-item">
          <strong>{mentions}</strong> Mentions
        </span>
      )}

      {articles !== undefined && (
        <span className="stats-item">
          <strong>{articles}</strong> Articles
        </span>
      )}

      {updated && (
        <span className="stats-item stats-muted">
          Updated {updated}
        </span>
      )}
    </div>
  );
}