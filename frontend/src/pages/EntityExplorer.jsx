import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiCompass, FiSearch } from "react-icons/fi";

import EntitySearch from "../components/entities/EntitySearch";
import EntityTable from "../components/entities/EntityTable";
import EntityDetailsModal from "../components/entities/EntityDetailsModal";
import { normalizeEntity } from "../utils/entityNormalizer";



import {
    getTopEntities,
    searchEntities,
    getEntityArticles
} from "../services/entityService";

import "./EntityExplorer.css";

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

        <main className="entity-explorer">
            <header className="entity-explorer-header">
                <div>
                    <p className="entity-explorer-eyebrow"><FiCompass aria-hidden="true" /> Intelligence workspace</p>
                    <h1>Entity Explorer</h1>
                    <p>Search the people, teams, competitions, and topics shaping the attention landscape.</p>
                </div>

                <div className="entity-explorer-count">
                    <strong>{entities.length}</strong>
                    <span>entities found</span>
                </div>
            </header>

            <section className="entity-explorer-panel">
                <div className="entity-explorer-toolbar">
                    <div>
                        <h2>Explore entities</h2>
                        <p>Search by entity name to inspect related coverage.</p>
                    </div>

                    <span className="entity-explorer-search-icon"><FiSearch aria-hidden="true" /></span>
                </div>

                <div className="entity-explorer-content">

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
            </section>
        </main>

    );

};

export default EntityExplorer;
