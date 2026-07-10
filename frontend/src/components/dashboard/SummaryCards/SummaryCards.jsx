import StatCard from "../../StatCard/StatCard";
import "./SummaryCards.css";

export default function SummaryCards({ summary, domains, categories }) {

    if (!summary)
        return null;

    return (

        <div className="summary-grid">

            <StatCard
                title="Articles"
                value={summary.total_articles}
            />

            <StatCard
                title="Entities"
                value={summary.unique_entities}
            />

            <StatCard
                title="Domains"
                value={domains.length}
            />

            <StatCard
                title="Categories"
                value={categories.length}
            />

        </div>

    );

}