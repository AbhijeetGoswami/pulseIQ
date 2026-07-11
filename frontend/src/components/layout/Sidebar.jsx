import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const menu = [
        {
            title: "Dashboard",
            icon: "🏠",
            path: "/"
        },
        {
            title: "Attention",
            icon: "📊",
            path: "/attention"
        },
        {
            title: "Trends",
            icon: "📈",
            path: "/trends"
        },
        {
            title: "Explorer",
            icon: "🔎",
            path: "/entities"
        },
        {
            title: "Pipeline",
            icon: "⚙️",
            path: "/pipeline"
        },
        {
            title: "Settings",
            icon: "🔧",
            path: "/settings"
        }
    ];

    return (

        <div
            className="d-flex flex-column bg-dark text-light"
            style={{
                width: 240,
                minHeight: "100vh"
            }}
        >

            <div
                className="px-3 py-4 border-bottom border-secondary"
            >

                <h4 className="mb-1">
                    PulseIQ
                </h4>

                <small className="text-secondary">
                    Attention Intelligence Platform
                </small>

            </div>

            <nav className="nav flex-column mt-3">

                {menu.map(item => (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-link px-4 py-3 ${
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-light"
                            }`
                        }
                    >

                        <span style={{ width: 30, display: "inline-block" }}>
                            {item.icon}
                        </span>

                        {item.title}

                    </NavLink>

                ))}

            </nav>

            <div
                className="mt-auto p-3 border-top border-secondary"
            >

                <small className="text-secondary">
                    PulseIQ
                </small>

                <br/>

                <small className="text-secondary">
                    Version 0.3.0
                </small>

            </div>

        </div>

    );

};

export default Sidebar;