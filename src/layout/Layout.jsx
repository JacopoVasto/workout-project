import { Outlet } from "react-router"

export default function Layout() {
    return (
        <div className="style-layout-system">

            <nav className="style-header"> Header </nav>

            <div className="style-main-content">
                <Outlet />
            </div>

            <footer className="style-footer"> Footer </footer>
        </div>
    );
};