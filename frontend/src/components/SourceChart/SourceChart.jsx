import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import styles from "./SourceChart.module.css";

function SourceChart({ data }) {

    if (!data) return null;

    return (
        <div className={styles.card}>

            <h2 className={styles.title}>
                Articles by Source
            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >
                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="source" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="articles"
                        fill="#2563eb"
                        radius={[6,6,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );

}

export default SourceChart;