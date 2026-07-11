import { Link } from "react-router-dom";

const NotFound = () => {

    return (

        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "#f8f9fa",
                textAlign: "center",
                padding: "30px"
            }}
        >

            <img
                src="/work-in-progress.png"
                alt="Under Construction"
                style={{
                    maxWidth: "250px",
                    width: "50%",
                    height: "auto"
                }}
            />

            <h2 className="mt-4 fw-bold">
                Module Under Construction
            </h2>

            <p
                className="text-muted"
                style={{
                    maxWidth: "600px",
                    fontSize: "18px"
                }}
            >
                This PulseIQ module is currently under active development.
                New intelligence capabilities will be available soon.
            </p>

            <Link
                to="/"
                className="btn btn-primary mt-3"
            >
                ← Back to Dashboard
            </Link>

        </div>

    );

};

export default NotFound;