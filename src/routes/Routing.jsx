import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from '../pages/HomePage';
import Layout from '../layout/Layout';
import Schedule from "../pages/schedule";
import ErrorPage from "../pages/error";

export function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>

                    <Route path="/" element={<HomePage />} />

                    <Route path="/schedule" element={<Schedule />} />

                    <Route path="*" element={<ErrorPage />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
};