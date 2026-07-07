import React, { useEffect, useState } from "react";

const PAGE_SIZE = 10;

const EntityDetailsModal = ({
    show,
    entity,
    articles,
    onClose,
}) => {

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [entity]);

    if (!show || !entity) {
        return null;
    }

    const formatDate = (dateString) => {

        if (!dateString) return "-";

        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return dateString;
        }

        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

    };

    const sortedArticles = [...articles].sort(
        (a, b) =>
            new Date(b.published_at) -
            new Date(a.published_at)
    );

    const totalPages = Math.ceil(
        sortedArticles.length / PAGE_SIZE
    );

    const startIndex =
        (currentPage - 1) * PAGE_SIZE;

    const endIndex =
        startIndex + PAGE_SIZE;

    const paginatedArticles =
        sortedArticles.slice(
            startIndex,
            endIndex
        );

    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor: "rgba(0,0,0,0.55)"
            }}
        >

            <div className="modal-dialog modal-xl modal-dialog-scrollable">

                <div className="modal-content shadow">

                    <div className="modal-header">

                    <div>

                        <h3 className="mb-1">

                            {entity.display_name}

                        </h3>

                       <div className="mt-2 d-flex flex-wrap gap-2">

                            <span className="badge rounded-pill bg-primary px-3 py-2">

                                Sport: {entity.sport}

                            </span>

                            <span className="badge rounded-pill bg-success px-3 py-2">

                                Type: {entity.entity_type.charAt(0).toUpperCase() + entity.entity_type.slice(1)}

                            </span>

                            <span className="badge rounded-pill bg-dark px-3 py-2">

                                Articles: {articles.length}

                            </span>

                        </div>

                    </div>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <h5 className="mb-3">

                            Showing {startIndex + 1}–
                            {Math.min(
                                endIndex,
                                sortedArticles.length
                            )}{" "}
                            of{" "}
                            {sortedArticles.length} Articles

                        </h5>

                        {sortedArticles.length === 0 ? (

                            <div className="alert alert-light">

                                No related articles found.

                            </div>

                        ) : (

                            <>

                                <table className="table table-hover align-middle">

                                    <thead>

                                        <tr>

                                            <th width="50%">
                                                Title
                                            </th>

                                            <th>
                                                Source
                                            </th>

                                            <th>
                                                Published
                                            </th>

                                            <th width="180">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {paginatedArticles.map(article => (

                                            <tr
                                                key={article.article_id}
                                            >

                                                <td>

                                                    {article.title}

                                                </td>

                                                <td>

                                                    📰 {article.source}

                                                </td>

                                                <td>

                                                    {formatDate(
                                                        article.published_at
                                                    )}

                                                </td>

                                                <td>

                                                    <a
                                                        href={article.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        Read Full Article ↗
                                                    </a>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                                {totalPages > 1 && (

                                    <nav className="mt-4">

                                        <ul className="pagination justify-content-center">

                                            <li
                                                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                                            >

                                                <button
                                                    className="page-link"
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            currentPage - 1
                                                        )
                                                    }
                                                >
                                                    Previous
                                                </button>

                                            </li>

                                            {Array.from(
                                                {
                                                    length: totalPages
                                                },
                                                (_, index) => (

                                                    <li
                                                        key={index}
                                                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                                    >

                                                        <button
                                                            className="page-link"
                                                            onClick={() =>
                                                                setCurrentPage(
                                                                    index + 1
                                                                )
                                                            }
                                                        >
                                                            {index + 1}
                                                        </button>

                                                    </li>

                                                )
                                            )}

                                            <li
                                                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                                            >

                                                <button
                                                    className="page-link"
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            currentPage + 1
                                                        )
                                                    }
                                                >
                                                    Next
                                                </button>

                                            </li>

                                        </ul>

                                    </nav>

                                )}

                            </>

                        )}

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >

                            Close

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default EntityDetailsModal;