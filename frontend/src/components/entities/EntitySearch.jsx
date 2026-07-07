import React from "react";

const EntitySearch = ({ value, onChange }) => {

    return (

        <div className="mb-3">

            <input
                type="text"
                className="form-control"
                placeholder="🔍 Search entities..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

        </div>

    );

};

export default EntitySearch;