import { FiArrowUpRight, FiFileText } from "react-icons/fi";

import styles from "./ArticleTable.module.css";

function formatPublishedDate(value) {
    if (!value) return "Unknown date";

    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? value
        : new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

function ArticleTable({ articles = [] }) {
    if (!articles.length) {
        return (
            <div className={styles.empty}>
                <FiFileText aria-hidden="true" />
                <p>No articles are available in this snapshot.</p>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Article</th>
                        <th>Source</th>
                        <th>Sport</th>
                        <th>Published</th>
                    </tr>
                </thead>

                <tbody>
                    {articles.map((article) => (
                        <tr key={article.id ?? article.link}>
                            <td className={styles.titleCell}>
                                <a href={article.link} target="_blank" rel="noreferrer">
                                    <span>{article.title}</span>
                                    <FiArrowUpRight aria-hidden="true" />
                                </a>
                            </td>
                            <td>{article.source || "Unknown source"}</td>
                            <td><span className={styles.sport}>{article.sport || "General"}</span></td>
                            <td>{formatPublishedDate(article.published_at)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ArticleTable;
