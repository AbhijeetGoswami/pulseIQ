import "./Panel.css";

export default function Panel({ title, description, action, children, className = "" }) {
    return (
        <section className={`panel ${className}`.trim()}>
            {(title || action) && (
                <header className="panel-header">
                    <div className="panel-heading">
                        {title && <h2>{title}</h2>}
                        {description && <p>{description}</p>}
                    </div>
                    {action && <div className="panel-action">{action}</div>}
                </header>
            )}

            <div className="panel-body">{children}</div>
        </section>
    );
}
