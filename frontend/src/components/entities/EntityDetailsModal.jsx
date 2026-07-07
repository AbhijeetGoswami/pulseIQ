import React from "react";

const EntityDetailsModal = ({
    show,
    entity,
    articles,
    onClose,
}) => {

    if (!show || !entity) {
        return null;
    }

    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <div>

                            <h4 className="mb-1">

                                {entity.display_name}

                            </h4>

                            <small>

                                {entity.sport} • {entity.entity_type}

                            </small>

                        </div>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <h5 className="mb-3">

                            Related Articles

                        </h5>

                        {articles.length === 0 ? (

                            <p>No articles found.</p>

                        ) : (

                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>Title</th>
                                        <th>Source</th>
                                        <th>Published</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {articles.map(article => (

                                        <tr key={article.article_id}>

                                            <td>

                                                {article.title}

                                            </td>

                                            <td>

                                                {article.source}

                                            </td>

                                            <td>

                                                {article.published_at}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

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