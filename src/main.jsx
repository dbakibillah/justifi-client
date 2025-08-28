import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/Home/Home";
import AuthProvider from "./providers/AuthProviders";
import Root from "./routes/Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Blog from "./pages/blog/Blog";
import Lawyer from "./pages/lawyers/Lawyer";
import Arbitrator from "./pages/arbitrator/Arbitrator";
import Mediator from "./pages/mediator/Mediator";
import BlogDetails from "./pages/blog/components/BlogDetails";

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
                        <Route path="/lawyers" element={<Lawyer />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:blogId" element={<BlogDetails />} />
                        <Route path="/arbitrators" element={<Arbitrator />} />
                        <Route path="/mediators" element={<Mediator />} />
                    </Route>
                </Routes>
            </QueryClientProvider>
        </AuthProvider>
    </BrowserRouter>
);
