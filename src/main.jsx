import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Arbitrator from "./pages/arbitrator/Arbitrator";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./pages/blog/components/BlogDetails";
import Home from "./pages/Home/Home";
import Lawyer from "./pages/lawyers/Lawyer";
import Mediator from "./pages/mediator/Mediator";
import AuthProvider from "./providers/AuthProviders";
import Root from "./routes/Root";
import MediatorDetails from "./pages/mediator/components/MediatorDetails";
import ArbitratorDetails from "./pages/arbitrator/components/ArbitratorDetails";
import LawyerDetails from "./pages/lawyers/components/LawyerDetails";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/lawyers" element={<Lawyer />} />
            <Route path="lawyers/:lawyerId" element={<LawyerDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:blogId" element={<BlogDetails />} />
            <Route path="/arbitrators" element={<Arbitrator />} />
            <Route
              path="/arbitrators/:arbitratorID"
              element={<ArbitratorDetails />}
            />
            <Route path="/mediators" element={<Mediator />} />
            <Route
              path="/mediators/:mediatorsobj"
              element={<MediatorDetails />}
            />
          </Route>
        </Routes>
      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);
