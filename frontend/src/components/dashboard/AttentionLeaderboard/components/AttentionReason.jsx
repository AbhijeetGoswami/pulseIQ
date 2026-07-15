import "./AttentionReason.css";

export default function AttentionReason({
  score,
  mentions,
  articles,
  trend,
  entityType,
}) {
  const reasons = [];

  if (score >= 90) {
    reasons.push("Highest attention score in current snapshot");
  } else if (score >= 70) {
    reasons.push("Strong attention across monitored articles");
  }

  if (mentions >= 50) {
    reasons.push("High mention volume detected");
  } else if (mentions >= 20) {
    reasons.push("Consistent mention activity");
  }

  if (articles >= 20) {
    reasons.push("Covered across multiple articles");
  }

  if (trend) {
    switch (trend.toUpperCase()) {
      case "RISING":
        reasons.push("Attention currently increasing");
        break;

      case "FALLING":
        reasons.push("Attention beginning to decline");
        break;

      case "NEW":
        reasons.push("Recently entered the attention leaderboard");
        break;

      case "STABLE":
        reasons.push("Attention remains steady");
        break;

      default:
        break;
    }
  }

  if (entityType) {
    reasons.push(`${entityType} currently monitored`);
  }

  if (!reasons.length) {
    reasons.push("Attention calculated from current intelligence snapshot");
  }

  return (
    <div className="attention-reason">
      <div className="reason-title">
        Why this score?
      </div>

      <ul className="reason-list">
        {reasons.slice(0, 4).map((reason, index) => (
          <li
            key={index}
            className="reason-item"
          >
            ✓ {reason}
          </li>
        ))}
      </ul>
    </div>
  );
}