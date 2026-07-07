import { NavLink } from "react-router-dom";

import {

    FiHome,

    FiFileText,

    FiCpu,

    FiBarChart2

} from "react-icons/fi";

import "./Sidebar.css";

const Sidebar = () => {

    return (

        <aside className="sidebar">

            <div className="sidebar-header">

                <h2>PulseIQ</h2>

                <p>Attention Intelligence</p>

            </div>

            <nav className="sidebar-nav">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >
                    <FiHome />

                    Dashboard

                </NavLink>

                <NavLink
                    to="/articles"
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >
                    <FiFileText />

                    Articles

                </NavLink>

                <NavLink
                    to="/entities"
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >
                    <FiCpu />

                    Entities

                </NavLink>

                <NavLink
                    to="/metrics"
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >
                    <FiBarChart2 />

                    Metrics

                </NavLink>

            </nav>

            <div className="sidebar-footer">

                PulseIQ

                <br />

                Version 0.2.0

            </div>

        </aside>

    );

};

export default Sidebar;