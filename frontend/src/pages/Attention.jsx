import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiActivity, FiFilter, FiSearch, FiTrendingUp, FiChevronDown } from "react-icons/fi";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import Loader from "../components/Loader/Loader";
import LeaderboardPagination from "../components/common/LeaderboardPagination/LeaderboardPagination";
import useAttention from "../hooks/useAttention";
import "./AttentionPage.css";

const SORT_OPTIONS = [
    { value: "attention_score", label: "Attention Score" },
    { value: "mentions", label: "Mentions" },
    { value: "rank", label: "Rank" },
    { value: "type", label: "Entity Type" },
];

export default function Attention() {
    const { data, loading, error } = useAttention();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedSport, setSelectedSport] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [sortBy, setSortBy] = useState("attention_score");
    const [sortDirection, setSortDirection] = useState("desc");
    const navigate = useNavigate();

    const attention = data?.attention;
    const entities = attention?.entities || [];
    const sports = ["All", ...Array.from(new Set(entities.map((item) => item.sport).filter(Boolean)))];
    const types = ["All", ...Array.from(new Set(entities.map((item) => item.type).filter(Boolean)))];

    const filteredEntities = useMemo(() => {
        return entities
            .filter((entity) => {
                const query = search.trim().toLowerCase();
                const matchesSearch = query
                    ? String(entity.value).toLowerCase().includes(query) || String(entity.id ?? entity.entity_id).toLowerCase().includes(query)
                    : true;
                const matchesSport = selectedSport === "All" || entity.sport === selectedSport;
                const matchesType = selectedType === "All" || entity.type === selectedType;
                return matchesSearch && matchesSport && matchesType;
            })
            .map((entity, index) => ({
                ...entity,
                rank: index + 1,
            }));
    }, [entities, search, selectedSport, selectedType]);

    const sortedEntities = useMemo(() => {
        const sorted = [...filteredEntities];
        sorted.sort((a, b) => {
            if (sortBy === "rank") {
                return a.rank - b.rank;
            }
            if (sortBy === "type") {
                return String(a.type || "").localeCompare(String(b.type || ""));
            }
            const valueA = Number(a[sortBy] ?? 0);
            const valueB = Number(b[sortBy] ?? 0);
            return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
        });
        return sorted;
    }, [filteredEntities, sortBy, sortDirection]);

    const totalPages = Math.max(1, Math.ceil(sortedEntities.length / 12));
    const page = Math.min(currentPage, totalPages);
    const pageItems = sortedEntities.slice((page - 1) * 12, page * 12);

    const handleSortChange = (value) => {
        if (sortBy === value) {
            setSortDirection((current) => (current === "desc" ? "asc" : "desc"));
        } else {
            setSortBy(value);
            setSortDirection("desc");
        }
    };

    if (loading) return <Loader />;
    if (error || !attention) return <ErrorCard error={error} />;

    return (
        <main className="attention-page">
            <header className="attention-page-header">
                <p><FiActivity aria-hidden="true" /> Intelligence workspace</p>
                <h1>Attentions</h1>
                <span>Explore every entity currently drawing attention.</span>
            </header>

            <section className="attention-toolbar">
                <div className="attention-search">
                    <FiSearch aria-hidden="true" />
                    <input
                        type="search"
                        placeholder="Search by entity name or ID"
                        value={search}
                        onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }}
                        aria-label="Search attentions"
                    />
                </div>

                <div className="attention-filters">
                    <label>
                        Category
                        <select value={selectedSport} onChange={(event) => { setSelectedSport(event.target.value); setCurrentPage(1); }}>
                            {sports.map((sport) => <option key={sport} value={sport}>{sport}</option>)}
                        </select>
                    </label>
                    <label>
                        Entity Type
                        <select value={selectedType} onChange={(event) => { setSelectedType(event.target.value); setCurrentPage(1); }}>
                            {types.map((type) => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </label>
                    <label>
                        Sort by
                        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </label>
                    <button type="button" className="sort-direction" onClick={() => setSortDirection((current) => (current === "desc" ? "asc" : "desc"))} aria-label="Toggle sort direction">
                        <FiChevronDown aria-hidden="true" className={sortDirection === "asc" ? "rotate" : ""} />
                        {sortDirection === "desc" ? "Descending" : "Ascending"}
                    </button>
                </div>
            </section>

            <section className="attention-table-wrapper">
                <table className="attention-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Entity</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Attention Score</th>
                            <th>Mentions</th>
                            <th>Sources</th>
                            <th>Updated</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageItems.map((entity, index) => (
                            <tr key={entity.id ?? entity.entity_id ?? `${entity.value}-${page}-${index}`} onClick={() => navigate(`/attention/${entity.id ?? entity.entity_id}`, { state: { from: "attention" } })} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && navigate(`/attention/${entity.id ?? entity.entity_id}`, { state: { from: "attention" } })}>
                                <td>{(page - 1) * 12 + index + 1}</td>
                                <td>
                                    <strong>{entity.value}</strong>
                                    <div className="entity-meta">{entity.sport || "Unknown"}</div>
                                </td>
                                <td>{entity.sport || "Unknown"}</td>
                                <td>{entity.type || "N/A"}</td>
                                <td>{Math.round(entity.attention_score ?? entity.scores?.mention ?? 0)}</td>
                                <td>{entity.mentions ?? "—"}</td>
                                <td>{entity.sources ?? "—"}</td>
                                <td>{data.generated_at ? new Date(data.generated_at).toLocaleString() : "—"}</td>
                                <td>
                                    <button type="button" onClick={(event) => {
                                        event.stopPropagation();
                                        navigate(`/attention/${entity.id ?? entity.entity_id}`, { state: { from: "attention" } });
                                    }}>
                                        Open Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {pageItems.length === 0 && (
                            <tr>
                                <td colSpan={9} className="attention-empty-row">No entities match the current filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            <LeaderboardPagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={sortedEntities.length}
                onPrevious={() => setCurrentPage(page - 1)}
                onNext={() => setCurrentPage(page + 1)}
            />
        </main>
    );
}
