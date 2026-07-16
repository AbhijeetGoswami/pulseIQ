import { useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import TrendLeaderboard from "../components/dashboard/TrendLeaderboard/TrendLeaderboard";
import LeaderboardPagination from "../components/common/LeaderboardPagination/LeaderboardPagination";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import Loader from "../components/Loader/Loader";
import useTrends from "../hooks/useTrends";
import "./LeaderboardPage.css";

export default function Trends() {
    const { data, loading, error } = useTrends();
    const [currentPage, setCurrentPage] = useState(1);
    if (loading) return <Loader />;
    if (error || !data) return <ErrorCard />;

    const trends = data.trends || [];
    const totalPages = Math.max(1, Math.ceil(trends.length / 10));
    const page = Math.min(currentPage, totalPages);
    const pageItems = trends.slice((page - 1) * 10, page * 10);

    return (
        <main className="leaderboard-page">
            <header className="leaderboard-page-header leaderboard-page-header--trend">
                <p><FiTrendingUp aria-hidden="true" /> Intelligence workspace</p>
                <h1>Trends</h1>
                <span>Explore all changes detected across the latest snapshot.</span>
            </header>
            <TrendLeaderboard trends={pageItems} limit={10} showViewMore={false} />
            <LeaderboardPagination currentPage={page} totalPages={totalPages} totalItems={trends.length} onPrevious={() => setCurrentPage(page - 1)} onNext={() => setCurrentPage(page + 1)} />
        </main>
    );
}
