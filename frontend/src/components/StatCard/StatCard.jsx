import styles from "./StatCard.module.css";

function StatCard({ title, value, color = "#2563eb" }) {

    return (
        <div
            className={styles.card}
            style={{
                borderLeft: `6px solid ${color}`,
            }}
        >
            <h4 className={styles.title}>
                {title}
            </h4>

            <h2 className={styles.value}>
                {value}
            </h2>
        </div>
    );
}

export default StatCard;