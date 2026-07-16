import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "./LeaderboardPagination.css";

export default function LeaderboardPagination({ currentPage, totalPages, totalItems, onPrevious, onNext }) {
    return (
        <nav className="leaderboard-pagination" aria-label="Leaderboard pagination">
            <span>Page {currentPage} of {totalPages} · {totalItems} items</span>
            <div>
                <button type="button" onClick={onPrevious} disabled={currentPage === 1}>
                    <FiChevronLeft aria-hidden="true" /> Previous
                </button>
                <button type="button" onClick={onNext} disabled={currentPage === totalPages}>
                    Next <FiChevronRight aria-hidden="true" />
                </button>
            </div>
        </nav>
    );
}
