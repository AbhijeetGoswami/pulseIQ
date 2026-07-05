function StatCard({ title, value, color = "#2563eb" }) {
    return (
        <div
            style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,.08)",
                borderLeft: `6px solid ${color}`,
            }}
        >
            <h4
                style={{
                    margin: 0,
                    color: "#666",
                    fontSize: "14px",
                }}
            >
                {title}
            </h4>

            <h2
                style={{
                    marginTop: "12px",
                    marginBottom: 0,
                    fontSize: "32px",
                }}
            >
                {value}
            </h2>
        </div>
    );
}

export default StatCard;