import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Articles from "./pages/Articles";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/articles"
                    element={<Articles />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;