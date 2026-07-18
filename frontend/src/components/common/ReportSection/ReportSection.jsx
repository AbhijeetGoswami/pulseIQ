import Panel from "../Panel/Panel";
import "./ReportSection.css";

export default function ReportSection({
    title,
    description,
    actions,
    children,
    className = "",
}) {
    return (
        <section className={`report-section ${className}`}>
            <Panel>
                <div className="report-section-header">
                    <div>
                        <h2>{title}</h2>

                        {description && (
                            <p className="report-section-description">
                                {description}
                            </p>
                        )}
                    </div>

                    {actions && (
                        <div className="report-section-actions">
                            {actions}
                        </div>
                    )}
                </div>

                <div className="report-section-body">
                    {children}
                </div>
            </Panel>
        </section>
    );
}