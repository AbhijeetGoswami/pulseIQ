import { FiArrowLeft } from "react-icons/fi";
import "./HeroSection.css";

export default function HeroSection({
    entity,
    generatedAt,
    location,
    navigate,
    formatDateTime,
    formatNumber,
}) {

    const handleBack = () => {
        const from = location.state?.from;

        if (from === "attention") {
            navigate("/attention");
        } else if (from === "dashboard") {
            navigate("/");
        } else {
            navigate(-1);
        }
    };

    return (
        <header className="attention-hero">

            <button
                className="attention-hero-back"
                onClick={handleBack}
            >
                <FiArrowLeft />
                Back
            </button>

            <div className="attention-hero-main">

                <div className="attention-hero-identity">

                    <span className="entity-category">
                        {entity.sport || "General"}
                    </span>

                    <h1>{entity.value}</h1>

                    <div className="entity-meta">

                        <span>{entity.type || "Entity"}</span>

                        <span>•</span>

                        <span>
                            Updated {formatDateTime(generatedAt)}
                        </span>

                    </div>

                </div>

                <div className="attention-score-card">

                    <span>Attention Score</span>

                    <strong>
                        {Math.round(
                            entity.attention_score ??
                            entity.scores?.mention ??
                            0
                        )}
                    </strong>

                </div>

            </div>

        </header>
    );
}