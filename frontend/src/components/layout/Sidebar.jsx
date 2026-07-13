import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FiActivity,
    FiBarChart2,
    FiChevronDown,
    FiChevronUp,
    FiCompass,
    FiHome,
    FiLogOut,
    FiSettings,
    FiTrendingUp,
    FiUser,
    FiLock
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

import "./Sidebar.css";

const menu = [
    { title: "Dashboard", icon: FiHome, path: "/" },
    { title: "Attention", icon: FiActivity, path: "/attention" },
    { title: "Trends", icon: FiTrendingUp, path: "/trends" },
    { title: "Explorer", icon: FiCompass, path: "/entities" },
    { title: "Pipeline", icon: FiBarChart2, path: "/pipeline" },
    { title: "Settings", icon: FiSettings, path: "/settings" }
];

const roleLabels = {
    admin: "Administrator",
    analyst: "Analyst",
    viewer: "Viewer"
};

export default function Sidebar() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        function handleOutsideClick(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {

                setMenuOpen(false);

            }

        }

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

        };

    }, []);

    const displayName = user
        ? [user.first_name, user.last_name]
              .filter(Boolean)
              .join(" ")
        : "Guest User";

    const displayRole =
        roleLabels[user?.role] ??
        "Workspace Member";

    async function handleLogout() {

        setMenuOpen(false);

        await logout();

        navigate("/login", {
            replace: true
        });

    }

    return (

        <aside
            className="sidebar"
            aria-label="Primary Navigation"
        >

            {/* =======================================================
                Header
            ======================================================= */}

            {/* <div className="sidebar-header">

                <img
                    src="/logo.png"
                    alt="AttenBase"
                    className="sidebar-logo"
                />

                <div>

                    <h2>AttenBase</h2>

                    <p>Attention Intelligence</p>

                </div>

            </div> */}

            <div className="sidebar-header">

                <div className="sidebar-logo-wrapper">

                    <img
                        src="/logo.png"
                        alt="AttenBase"
                        className="sidebar-logo"
                    />

                </div>

                <div className="sidebar-brand">

                    <h2>

                        AttenBase

                    </h2>

                    <p>

                        Attention Intelligence

                    </p>

                </div>

            </div>

            {/* =======================================================
                Navigation
            ======================================================= */}

            <nav className="sidebar-nav">

                <p className="sidebar-nav-label">

                    Workspace

                </p>

                {

                    menu.map(
                        ({
                            title,
                            icon: Icon,
                            path
                        }) => (

                            <NavLink

                                key={path}

                                to={path}

                                end={path === "/"}

                                className={({

                                    isActive

                                }) =>
                                    `sidebar-link${isActive ? " active" : ""}`
                                }

                            >

                                <Icon />

                                <span>

                                    {title}

                                </span>

                            </NavLink>

                        )
                    )

                }

            </nav>

            {/* =======================================================
                Footer
            ======================================================= */}

            <footer className="sidebar-footer">

                <div
                    ref={menuRef}
                    className="sidebar-user"
                >

                    <div
                        role="button"
                        tabIndex={0}
                        className="sidebar-user-content"
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        onKeyDown={(e) => {

                            if (
                                e.key === "Enter" ||
                                e.key === " "
                            ) {

                                e.preventDefault();

                                setMenuOpen(!menuOpen);

                            }

                        }}
                    >

                        <span className="sidebar-user-avatar">

                            <FiUser />

                        </span>

                        <span className="sidebar-user-details">

                            <strong>

                                {displayName}

                            </strong>

                            <small>

                                {user?.email ??
                                    "Not signed in"}

                            </small>

                            <small className="sidebar-user-role">

                                {displayRole}

                            </small>

                        </span>

                        <span className="sidebar-user-menu">

                            {

                                menuOpen

                                    ? <FiChevronUp />

                                    : <FiChevronDown />

                            }

                        </span>

                    </div>

                    {

                        menuOpen && (

                            <div className="sidebar-dropdown">

                                <button
                                    type="button"
                                    disabled
                                >

                                    <FiUser />

                                    My Profile

                                    <span className="coming-soon">

                                        Soon

                                    </span>

                                </button>

                                <button
                                    type="button"
                                    disabled
                                >

                                    <FiLock />

                                    Change Password

                                    <span className="coming-soon">

                                        Soon

                                    </span>

                                </button>

                                <button
                                    type="button"
                                    disabled
                                >

                                    <FiSettings />

                                    Preferences

                                    <span className="coming-soon">

                                        Soon

                                    </span>

                                </button>

                                <hr />

                                <button
                                    type="button"
                                    className="logout-button"
                                    onClick={handleLogout}
                                >

                                    <FiLogOut />

                                    Logout

                                </button>

                            </div>

                        )

                    }

                </div>

                <span className="sidebar-footer-status">

                    <i />

                    System Operational

                </span>

                <span className="sidebar-version">

                    AttenBase • v 0.3.0

                </span>

            </footer>

        </aside>

    );

}