import { FiZap } from "react-icons/fi";

import "./AiHighlights.css";

export default function AiHighlights({ categories = [], trends = [], sources = [] }) {
    const hottestCategory = [...categories].sort((a, b) => Number(b.mentions || 0) - Number(a.mentions || 0))[0];
    const fastestMover = [...trends].sort((a, b) => Number(b.score_change || 0) - Number(a.score_change || 0))[0];
    const topSource = sources[0];

    return (
        <section className="ai-highlights" aria-label="Today's highlights">
            <header><FiZap aria-hidden="true" /><div><h2>Today’s highlights</h2><p>AI snapshot</p></div></header>
            <ul>
                <li>{hottestCategory ? <><strong>{hottestCategory.name}</strong> is leading attention across monitored coverage.</> : "Category activity will appear as new coverage is processed."}</li>
                <li>{fastestMover ? <><strong>{fastestMover.value}</strong> is the fastest-growing entity, up {Number(fastestMover.score_change || 0).toFixed(1)} points.</> : "No significant attention changes detected yet."}</li>
                <li>{topSource ? <><strong>{topSource.source}</strong> contributed the most coverage in this snapshot.</> : "Source coverage will update automatically."}</li>
            </ul>
        </section>
    );
}
