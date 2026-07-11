import { useEffect, useState } from "react";

const messages = [
    "Analyzing attention signals...",
    "Computing trend intelligence...",
    "Processing latest articles...",
    "Preparing dashboard..."
];

function Loader() {

    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {

        const timer = setInterval(() => {

            setMessageIndex((current) =>
                (current + 1) % messages.length
            );

        }, 2000);

        return () => clearInterval(timer);

    }, []);

    return (

        <div
            style={{
                minHeight: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >

            <div
                style={{
                    textAlign: "center"
                }}
            >

                <h1
                    style={{
                        fontWeight: 700,
                        marginBottom: "10px",
                        color: "#1f2937"
                    }}
                >
                    PulseIQ
                </h1>

                <p
                    style={{
                        color: "#6b7280",
                        marginBottom: "30px"
                    }}
                >
                    Attention Intelligence Platform
                </p>

                <div
                    className="spinner-border text-primary"
                    role="status"
                    style={{
                        width: "3.5rem",
                        height: "3.5rem"
                    }}
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <h4
                    style={{
                        marginTop: "30px",
                        marginBottom: "10px"
                    }}
                >
                    Loading Intelligence...
                </h4>

                <p
                    style={{
                        color: "#6b7280",
                        minHeight: "24px"
                    }}
                >
                    {messages[messageIndex]}
                </p>

            </div>

        </div>

    );

}

export default Loader;