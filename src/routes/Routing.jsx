import { BrowserRouter, Route } from "react-router";
import Homepage from '../pages/HomePage';
import Layout from '../layout/Layout'
import ErrorPage from "../pages/error";

export function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>

                    <Route path="/" element={<Homepage />} />

                    <Route path="*" element={<ErrorPage />}/>

                </Route>
            </Routes>
        </BrowserRouter>
    );
};