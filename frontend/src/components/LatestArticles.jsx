function LatestArticles({ articles }) {

    if (!articles) return null;

    return (
        <div
            style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,.08)",
            }}
        >
            <h2>Latest Articles</h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr>
                        <th align="left">Title</th>
                        <th align="left">Source</th>
                        <th align="left">Sport</th>
                    </tr>
                </thead>

                <tbody>
                    {articles.map(article => (
                        <tr key={article.id}>
                            <td style={{ padding: "10px 0" }}>
                                {article.title}
                            </td>

                            <td>{article.source}</td>

                            <td>{article.sport}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LatestArticles;