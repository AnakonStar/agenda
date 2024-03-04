import { Route, Routes } from "react-router-dom";

import Home from './pages/home';

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                exact
                path="/"
                element={<Home />}
            ></Route>
        </Routes>
    )
}
