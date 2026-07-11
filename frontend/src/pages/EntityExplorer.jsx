import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import EntitySearch from "../components/entities/EntitySearch";
import EntityTable from "../components/entities/EntityTable";
import EntityDetailsModal from "../components/entities/EntityDetailsModal";
import { normalizeEntity } from "../utils/entityNormalizer";



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

    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const entityId = params.get("id");
    console.log("entityId =", entityId);

    useEffect(() => {

        const timeout = setTimeout(() => {

            loadEntities();

        }, 300);

        return () => clearTimeout(timeout);

    }, [search]);

    const loadEntities = async () => {

        setLoading(true);

        try {

            let data;

            if (search.trim() === "") {

                data = await getTopEntities();

            } else {

                data = await searchEntities(search);

            }

            console.log("Loaded Entities:", data);

            setEntities(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    // const handleView = async (entity) => {

    //     try {

    //         setSelectedEntity(entity);

    //         const entityIdentifier =
    //             entity.entity_id ??
    //             entity.id;

    //         const data = await getEntityArticles(
    //             entityIdentifier
    //         );

    //         setArticles(data);

    //         setShowModal(true);

    //     } catch (error) {

    //         console.error(error);

    //     }

    // };

    //     const handleView = async (entity) => {

    //     try {

    //         setSelectedEntity(entity);

    //         const entityIdentifier =
    //             entity.id ??
    //             entity.entity_id;

    //         const data =
    //             await getEntityArticles(entityIdentifier);

    //         setArticles(data);

    //         setShowModal(true);

    //     } catch (error) {

    //         console.error(error);

    //     }

    // };

            const handleView = async (entity) => {
                console.log("handleView called", entity);

            try {

                const normalized = normalizeEntity(entity);

                setSelectedEntity(normalized);

                const data = await getEntityArticles(
                    normalized.entity_id
                );

                setArticles(data);

                setShowModal(true);

            } catch (error) {

                console.error(error);

            }

        };

    /*
     * Dashboard Deep Link Support
     *
     * Example:
     * /entities?id=football_player_lionel_messi
     *
     */

    // useEffect(() => {

    //     if (!entityId)
    //         return;

    //     if (entities.length === 0)
    //         return;

    //     const entity = entities.find(item => {

    //         return (

    //             item.entity_id === entityId ||

    //             item.id === entityId

    //         );

    //     });

    //     if (entity) {

    //         handleView(entity);

    //     }

    // }, [entities, entityId]);

                // const initialEntity = normalizeEntity(location.state?.entity);

        useEffect(() => {

            if (!entityId)
                return;

            const openEntity = async () => {

                const articles = await getEntityArticles(entityId);

                setSelectedEntity(
                    location.state?.entity ?? {
                        entity_id: entityId
                    }
                );

                setArticles(articles);

                setShowModal(true);

            };

            openEntity();

        }, [entityId]);

    // const handleCloseModal = () => {

    //     setShowModal(false);

    //     setSelectedEntity(null);

    //     setArticles([]);

    //     navigate(
    //         "/entities",
    //         {
    //             replace: true
    //         }
    //     );

    // };

        const handleCloseModal = () => {

        setShowModal(false);

        setSelectedEntity(null);

        setArticles([]);

        navigate(
            "/entities",
            {
                replace: true,
                state: null
            }
        );

    };

    console.log("Deep link effect");
    console.log("entityId =", entityId);
    console.log("entities =", entities.length);
    console.table(
    entities.map(e => ({
        entity_id: e.entity_id,
        id: e.id,
        display_name: e.display_name,
        value: e.value
            }))
    );

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
                        onClose={handleCloseModal}
                    />

                </div>

            </div>

        </div>

    );

};

export default EntityExplorer;