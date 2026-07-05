function ErrorCard({ error }) {

    return (

        <div
            style={{
                background: "#fee2e2",
                color: "#b91c1c",
                padding: "20px",
                borderRadius: "10px",
                margin: "40px",
            }}
        >

            <h2>Unable to load dashboard</h2>

            <p>{error?.message}</p>

        </div>

    );

}

export default ErrorCard;