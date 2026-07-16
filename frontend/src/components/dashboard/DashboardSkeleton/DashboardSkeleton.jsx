import "./DashboardSkeleton.css";

export default function DashboardSkeleton() {
    return <main className="dashboard-skeleton" aria-label="Loading dashboard" aria-busy="true"><div className="skeleton skeleton-hero" /><div className="skeleton-grid">{Array.from({ length: 4 }, (_, index) => <div className="skeleton skeleton-kpi" key={index} />)}</div><div className="skeleton-grid skeleton-grid--widgets">{Array.from({ length: 3 }, (_, index) => <div className="skeleton skeleton-widget" key={index} />)}</div></main>;
}
