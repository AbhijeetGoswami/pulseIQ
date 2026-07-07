import { useEffect, useState } from "react";

import EntitySearch from "../components/entities/EntitySearch";
import EntityTable from "../components/entities/EntityTable";
import EntityDetailsModal from "../components/entities/EntityDetailsModal";

// import {
//     getTopEntities,
//     searchEntities
// } from "../services/entityService";

import {
    getTopEntities,
    searchEntities,
    getEntityArticles
} from "../services/entityService";

const EntityExplorer = () => {

    const [entities, setEntities] = useState([]);


    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [articles, setArticles] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        const timeout = setTimeout(() => {

            loadEntities();

        }, 300);

        return () => clearTimeout(timeout);

         }, [search]);

            const handleView = async (entity) => {

            setSelectedEntity(entity);

            const data = await getEntityArticles(
                entity.entity_id
            );

            setArticles(data);

            setShowModal(true);

        };

     const loadEntities = async () => {

        setLoading(true);

        try {

            let data;

            if (search.trim() === "") {

                data = await getTopEntities();

            } else {

                data = await searchEntities(search);

            }

            setEntities(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container-fluid">

            <div className="card shadow-sm">

                <div className="card-header d-flex justify-content-between align-items-center">

                    <h4 className="mb-0">

                        Entity Explorer

                    </h4>

                    <span className="badge bg-primary">

                        {entities.length} Entities

                    </span>

                </div>

                <div className="card-body">

                    <EntitySearch

                        value={search}

                        onChange={setSearch}

                    />

                    <EntityTable
                        entities={entities}
                        loading={loading}
                        onView={handleView}
                    />

                    <EntityDetailsModal
                        show={showModal}
                        entity={selectedEntity}
                        articles={articles}
                        onClose={() => setShowModal(false)}
                    />

                </div>

            </div>

        </div>

    );

};

export default EntityExplorer;