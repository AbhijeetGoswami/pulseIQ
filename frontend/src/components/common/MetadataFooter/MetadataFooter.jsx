import "./MetadataFooter.css";

export default function MetadataFooter({
    generatedAt,
    entity,
    formatDateTime,
    reportSource = "Attention snapshot + entity coverage lookup",
}) {
    return (
        <footer className="metadata-footer">

            <div className="metadata-item">
                <strong>Snapshot Generated</strong>
                <p>{formatDateTime(generatedAt)}</p>
            </div>

            <div className="metadata-item">
                <strong>Report Source</strong>
                <p>{reportSource}</p>
            </div>

            <div className="metadata-item">
                <strong>Entity Metadata</strong>
                <p>{entity.id ?? entity.entity_id}</p>
            </div>

        </footer>
    );
}