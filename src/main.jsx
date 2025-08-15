import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/Home/Home";
import AuthProvider from "./providers/AuthProviders";
import Root from "./routes/Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<Root />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} /> 
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Routes>
            </QueryClientProvider>
        </AuthProvider>
    </BrowserRouter>
);
