import "./ReportLayout.css";

export function ReportStack({ children }) {
    return (
        <div className="report-stack">
            {children}
        </div>
    );
}

export function ReportFull({ children }) {
    return (
        <section className="report-full">
            {children}
        </section>
    );
}

export function ReportTwoColumn({
    left,
    right,
    leftWidth = "340px",
}) {
    return (
        <section
            className="report-two-column"
            style={{
                "--left-width": leftWidth,
            }}
        >
            <div className="report-column-left">
                {left}
            </div>

            <div className="report-column-right">
                {right}
            </div>
        </section>
    );
}