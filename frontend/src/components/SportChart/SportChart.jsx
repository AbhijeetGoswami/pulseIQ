import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Legend,
} from "recharts";

import styles from "./SportChart.module.css";

function SportChart({ data }) {

    if (!data) return null;

    return (
        <div className={styles.card}>

            <h2 className={styles.title}>
                Articles by Sport
            </h2>

            <ResponsiveContainer width="100%" height={320}>
                <PieChart>

                    <Pie
                        data={data}
                        dataKey="articles"
                        nameKey="sport"
                        outerRadius={100}
                        label
                    />

                    <Tooltip />

                    <Legend />

                </PieChart>
            </ResponsiveContainer>

        </div>
    );
}

export default SportChart;