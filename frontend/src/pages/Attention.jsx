import { useState } from "react";
import { FiActivity } from "react-icons/fi";
import AttentionLeaderboard from "../components/dashboard/AttentionLeaderboard/AttentionLeaderboard";
import LeaderboardPagination from "../components/common/LeaderboardPagination/LeaderboardPagination";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import Loader from "../components/Loader/Loader";
import useAttention from "../hooks/useAttention";
import "./LeaderboardPage.css";

export default function Attention() {
    const { data, loading, error } = useAttention();
    const [currentPage, setCurrentPage] = useState(1);
    if (loading) return <Loader />;
    if (error || !data?.attention) return <ErrorCard />;

    const entities = [...(data.attention.entities || [])]
        .sort((a, b) => Number(b.attention_score || 0) - Number(a.attention_score || 0));
    const totalPages = Math.max(1, Math.ceil(entities.length / 10));
    const page = Math.min(currentPage, totalPages);
    const pageItems = entities.slice((page - 1) * 10, page * 10);

    return (
        <main className="leaderboard-page">
            <header className="leaderboard-page-header">
                <p><FiActivity aria-hidden="true" /> Intelligence workspace</p>
                <h1>Attentions</h1>
                <span>Explore every entity currently drawing attention.</span>
            </header>
            <AttentionLeaderboard entities={pageItems} limit={10} showViewMore={false} />
            <LeaderboardPagination currentPage={page} totalPages={totalPages} totalItems={entities.length} onPrevious={() => setCurrentPage(page - 1)} onNext={() => setCurrentPage(page + 1)} />
        </main>
    );
}
