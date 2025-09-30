import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "./index.css";
import Arbitrator from "./pages/arbitrator/Arbitrator";
import ArbitratorDetails from "./pages/arbitrator/components/ArbitratorDetails";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./pages/blog/components/BlogDetails";
import Home from "./pages/Home/Home";
import BookLawyer from "./pages/lawyers/BookLawyer";
import Lawyer from "./pages/lawyers/Lawyer";
import LawyerDetails from "./pages/lawyers/LawyerDetails";
import MediatorDetails from "./pages/mediator/components/MediatorDetails";
import Mediator from "./pages/mediator/Mediator";
import AuthProvider from "./providers/AuthProviders";
import Root from "./routes/Root";
import Dashboard from "./dashboard/Dashboard";
import LawyerProfile from "./dashboard/lawyerDasgboard/pages/LawyerProfile";
import LawyerAppointments from "./dashboard/lawyerDasgboard/pages/LawyerAppointments";
import UserAppointments from "./dashboard/userDashboard/pages/UserAppointments";
import UserProfile from "./dashboard/userDashboard/pages/UserProfile";

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
                        <Route
                            path="lawyers/:lawyerId"
                            element={<LawyerDetails />}
                        />
                        <Route
                            path="/book-lawyer/:lawyerId"
                            element={<BookLawyer />}
                        />
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

                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<Dashboard />} />
                        <Route
                            path="lawyer-profile"
                            element={<LawyerProfile />}
                        />
                        <Route
                            path="appointments"
                            element={<LawyerAppointments />}
                        />
                        <Route path="user-profile" element={<UserProfile />} />
                        <Route
                            path="my-appointments"
                            element={<UserAppointments />}
                        />
                    </Route>
                </Routes>
            </QueryClientProvider>
        </AuthProvider>
        <ToastContainer />
    </BrowserRouter>
);
