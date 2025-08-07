import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./routes/Root";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router";


createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Root />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/login" element={<Login />} /> */}
            </Route>
        </Routes>
    </BrowserRouter>
);
