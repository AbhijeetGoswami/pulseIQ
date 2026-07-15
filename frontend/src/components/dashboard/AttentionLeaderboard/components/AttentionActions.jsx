import "./AttentionActions.css";

export default function AttentionActions({
  entity,
  onView,
}) {
  const handleView = () => {
    if (onView) {
      onView(entity);
    }
  };

  return (
    <div className="attention-actions">
      <button
        type="button"
        className="attention-action-button"
        onClick={handleView}
      >
        View Details →
      </button>
    </div>
  );
}