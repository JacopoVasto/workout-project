import { BrowserRouter, Route, Routes } from "react-router";
import AuthGate from "../components/AuthGate";

import HomePage from '../pages/homepage';
import Layout from '../layout/Layout';
import Schedule from "../pages/schedule";
import Programs from "../pages/programs";
import AuthPage from "../pages/auth";
import ErrorPage from "../pages/error";

export function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>

                    <Route path="/" element={<HomePage />} />

                    <Route path="/auth" element={<AuthPage />}></Route>

                    <Route path="/schedule" element={<AuthGate> <Schedule /> </AuthGate>} />

                    <Route path="/programs" element={<AuthGate> <Programs /> </AuthGate> } />

                    <Route path="*" element={<ErrorPage />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
};