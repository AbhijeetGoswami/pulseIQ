import React from "react";

const EntityTable = ({ entities, loading }) => {

    if (loading) {
        return <p>Loading entities...</p>;
    }

    if (!entities.length) {
        return <p>No entities found.</p>;
    }

    return (
        <table className="table table-striped table-hover">

            <thead>

                <tr>

                    <th>Entity</th>

                    <th>Mentions</th>

                </tr>

            </thead>

            <tbody>

                {entities.map((entity) => (

                    <tr key={entity.entity_id}>

                        <td>{entity.entity_id}</td>

                        <td>{entity.mentions}</td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
};

export default EntityTable;