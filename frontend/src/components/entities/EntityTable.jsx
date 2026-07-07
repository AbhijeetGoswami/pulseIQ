import React from "react";

const EntityTable = ({ entities = [], loading = false, onView }) => {

    if (loading) {
        return <p>Loading entities...</p>;
    }

    if (entities.length === 0) {
        return <p>No entities found.</p>;
    }

    const getSportClass = (sport) => {

        switch (sport?.toLowerCase()) {

            case "football":
                return "badge bg-primary";

            case "cricket":
                return "badge bg-success";

            case "tennis":
                return "badge bg-warning text-dark";

            default:
                return "badge bg-secondary";
        }
    };

    const getEntityIcon = (type) => {

        switch (type?.toLowerCase()) {

            case "team":
                return "👥";

            case "competition":
                return "🏆";

            default:
                return "📌";
        }
    };

    return (

        <table className="table table-hover table-bordered align-middle">

            <thead className="table-dark">

                <tr>

                    <th style={{ width: "35%" }}>
                        Entity
                    </th>

                    <th style={{ width: "20%" }}>
                        Sport
                    </th>

                    <th style={{ width: "20%" }}>
                        Type
                    </th>

                    
                    <th
                        style={{
                            width: "15%",
                            textAlign: "center"
                        }}
                    >
                        Mentions
                    </th>

                    <th style={{ width: "20%" }}>
                        Action
                    </th>

                </tr>

            </thead>

            <tbody>

                {entities.map((entity) => (

                    <tr key={entity.entity_id}>

                        <td>

                            <strong>

                                {entity.display_name}

                            </strong>

                        </td>

                        <td>

                            <span
                                className={getSportClass(entity.sport)}
                            >

                                {entity.sport}

                            </span>

                        </td>

                        <td>

                            {getEntityIcon(entity.entity_type)}{" "}

                            {entity.entity_type.charAt(0).toUpperCase() +
                                entity.entity_type.slice(1)}

                        </td>

                        <td
                            style={{
                                textAlign: "center",
                                fontWeight: "bold"
                            }}
                        >

                            {entity.mentions}

                        </td>

                        <td>

                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => onView(entity)}
                        >

                            👁 View

                        </button>

                         </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

};

export default EntityTable;