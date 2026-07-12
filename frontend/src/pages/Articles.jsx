import { FiFileText, FiRadio } from "react-icons/fi";

import Loader from "../components/Loader/Loader";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import ArticleTable from "../components/ArticleTable/ArticleTable";
import useArticles from "../hooks/useArticles";

import "./Articles.css";

function Articles() {
    const { articles, loading, error } = useArticles();

    if (loading) return <Loader />;
    if (error) return <ErrorCard error={error} />;

    return (
        <main className="articles-page">
            <header className="articles-header">
                <div>
                    <p className="articles-eyebrow"><FiRadio aria-hidden="true" /> Coverage intelligence</p>
                    <h1>Articles Explorer</h1>
                    <p>Browse the latest sources contributing to the current attention landscape.</p>
                </div>

                <div className="articles-count">
                    <FiFileText aria-hidden="true" />
                    <span><strong>{articles.length}</strong> articles available</span>
                </div>
            </header>

            <section className="articles-panel" aria-label="Available articles">
                <div className="articles-panel-heading">
                    <div>
                        <h2>Latest coverage</h2>
                        <p>Select any title to open the original source.</p>
                    </div>
                </div>

                <ArticleTable articles={articles} />
            </section>
        </main>
    );
}

export default Articles;
