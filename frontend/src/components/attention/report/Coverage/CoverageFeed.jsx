import Panel from "../../../common/Panel/Panel";
import Loader from "../../../Loader/Loader";
import "./CoverageFeed.css";

export default function CoverageFeed({
    articles,
    articlesLoading,
    formatDateTime,
}) {
    return (
        <Panel title="Latest Coverage">

            {articlesLoading ? (
                <Loader />
            ) : articles.length ? (

                <div className="coverage-grid">

                    {articles.slice(0, 8).map(article => (

                        <article
                            key={article.article_id}
                            className="coverage-card"
                        >

                            <div className="coverage-card-header">

                                <span className="coverage-source">
                                    {article.source || "Source"}
                                </span>

                                <time>
                                    {formatDateTime(article.published_at)}
                                </time>

                            </div>

                            <h3>{article.title}</h3>

                            <a
                                href={article.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Read article
                            </a>

                        </article>

                    ))}

                </div>

            ) : (

                <p>No coverage articles are available.</p>

            )}

        </Panel>
    );
}