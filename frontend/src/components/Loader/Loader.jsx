import { useEffect, useState } from "react";
import { FiActivity } from "react-icons/fi";

import styles from "./Loader.module.css";

const messages = [
    "Analysing attention signals…",
    "Computing trend intelligence…",
    "Processing the latest articles…",
    "Preparing your dashboard…",
];

function Loader() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setMessageIndex((current) => (current + 1) % messages.length);
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    return (
        <main className={styles.loader} aria-live="polite" aria-busy="true">
            <section className={styles.card}>
                <div className={styles.brand}>
                    <img src="/brand.png" alt="AttenBase" />
                    <span>AttenBase</span>
                </div>

                <div className={styles.orb} aria-hidden="true">
                    <FiActivity />
                </div>

                <p className={styles.eyebrow}>Attention intelligence</p>
                <h1>Loading your workspace</h1>
                <p className={styles.message}>{messages[messageIndex]}</p>

                <div className={styles.progress} aria-hidden="true"><span /></div>
                <span className={styles.note}>This usually takes just a moment.</span>
            </section>
        </main>
    );
}

export default Loader;
