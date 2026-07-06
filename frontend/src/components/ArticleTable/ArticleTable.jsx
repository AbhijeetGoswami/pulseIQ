import styles from "./ArticleTable.module.css";

function ArticleTable({ articles }) {

    return (

        <table className={styles.table}>

            <thead>

                <tr>
                    <th>Title</th>
                    <th>Source</th>
                    <th>Sport</th>
                    <th>Published</th>
                </tr>

            </thead>

            <tbody>

                {articles.map(article => (

                    <tr key={article.id}>

                        <td>

                            <a
                                href={article.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {article.title}
                            </a>

                        </td>

                        <td>{article.source}</td>

                        <td>{article.sport}</td>

                        <td>{article.published_at}</td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default ArticleTable;