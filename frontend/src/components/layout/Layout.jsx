import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

import "./Layout.css";

const Layout = () => (
    <div className="app-layout">
        <Sidebar />
        <main className="main-content">
            <Outlet />
        </main>
    </div>
);

export default Layout;
