import { NavLink } from "react-router-dom";
import { FiActivity, FiBarChart2, FiCompass, FiHome, FiSettings, FiTrendingUp } from "react-icons/fi";

import "./Sidebar.css";

const menu = [
    { title: "Dashboard", icon: FiHome, path: "/" },
    { title: "Attention", icon: FiActivity, path: "/attention" },
    { title: "Trends", icon: FiTrendingUp, path: "/trends" },
    { title: "Explorer", icon: FiCompass, path: "/entities" },
    { title: "Pipeline", icon: FiBarChart2, path: "/pipeline" },
    { title: "Settings", icon: FiSettings, path: "/settings" },
];

export default function Sidebar() {
    return (
        <aside className="sidebar" aria-label="Primary navigation">
            <div className="sidebar-header">
                <img className="sidebar-logo" src="/brand.png" alt="PulseIQ" />
                <div>
                    <h2>AttenBase</h2>
                    <p>Attention intelligence</p>
                </div>
            </div>

            <nav className="sidebar-nav">
                <p className="sidebar-nav-label">Workspace</p>
                {menu.map(({ title, icon: Icon, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={path === "/"}
                        className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
                    >
                        <Icon aria-hidden="true" />
                        <span>{title}</span>
                    </NavLink>
                ))}
            </nav>

            <footer className="sidebar-footer">
                <span className="sidebar-footer-status"><i /> System operational</span>
                <span>PulseIQ · v0.3.0</span>
            </footer>
        </aside>
    );
}
