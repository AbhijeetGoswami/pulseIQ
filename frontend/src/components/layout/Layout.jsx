import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

import "./Layout.css";

const Layout = () => (
    <div className="app-layout">
        <Sidebar />
        <a className="skip-to-content" href="#main-content">Skip to content</a>
        <main id="main-content" className="main-content" tabIndex="-1">
            <div className="main-content-inner">
                <Outlet />
            </div>
        </main>
    </div>
);

export default Layout;
