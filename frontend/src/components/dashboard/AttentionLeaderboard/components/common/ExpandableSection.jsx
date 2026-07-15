import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import "./ExpandableSection.css";

export default function ExpandableSection({
    title = "View Details",
    defaultExpanded = false,
    children,
}) {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <div className="expandable-section">

            <button
                type="button"
                className="expandable-header"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
            >
                <span className="expandable-title">
                    {title}
                </span>

                <FiChevronDown
                    className={`expandable-icon ${
                        expanded ? "expanded" : ""
                    }`}
                />
            </button>

            <div
                className={`expandable-content ${
                    expanded ? "expanded" : ""
                }`}
            >
                {children}
            </div>

        </div>
    );
}