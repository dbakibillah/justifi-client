import { Outlet } from "react-router";
import DashboardLeft from "./components/DashboardLeft";

const Dashboard = () => {
    return (
        <section className="flex h-screen">
            <DashboardLeft />
            <main className="flex-1 overflow-auto bg-gray-50 p-6">
                <Outlet />
            </main>
        </section>
    );
};

export default Dashboard;
