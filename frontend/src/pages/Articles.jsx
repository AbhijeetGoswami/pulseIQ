import Loader from "../components/Loader/Loader";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import ArticleTable from "../components/ArticleTable/ArticleTable";

import useArticles from "../hooks/useArticles";

function Articles() {

    const {

        articles,
        loading,
        error,

    } = useArticles();

    if (loading)
        return <Loader />;

    if (error)
        return <ErrorCard error={error} />;

    return (

        <div
            style={{
                maxWidth:"1400px",
                margin:"40px auto",
                padding:"20px"
            }}
        >

            <h1>Articles Explorer</h1>

            <ArticleTable
                articles={articles}
            />

        </div>

    );

}

export default Articles;