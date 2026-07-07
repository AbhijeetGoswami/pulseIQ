import { useEffect, useState } from "react";

import EntityTable from "../components/entities/EntityTable";

import { getTopEntities } from "../services/entityService";

const EntityExplorer = () => {

    const [entities, setEntities] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadEntities();

    }, []);

    const loadEntities = async () => {

        try {

            const data = await getTopEntities();

            setEntities(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-4">

            <h2>Entity Explorer</h2>

            <EntityTable

                entities={entities}

                loading={loading}

            />

        </div>

    );
};

export default EntityExplorer;