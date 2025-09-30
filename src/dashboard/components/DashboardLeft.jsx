import {
    FaDashcube,
    FaUser,
    FaBalanceScale,
    FaHandshake,
    FaUsers,
    FaGavel,
    FaChevronRight,
    FaChevronLeft,
    FaHome,
    FaHeart,
} from "react-icons/fa";
import useUserData from "../../hooks/useUserData";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../common/loading/Loading";

const DashboardLeft = () => {
    const { userRole, currentUser, isLoading } = useUserData();
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState("");

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Redirect from /dashboard to appropriate profile
    useEffect(() => {
        if (location.pathname === "/dashboard") {
            const profileRoutes = {
                user: "/dashboard/user-profile",
                lawyer: "/dashboard/lawyer-profile",
                arbitrator: "/dashboard/arbitrator-profile",
                mediator: "/dashboard/mediator-profile",
                admin: "/dashboard/all-users",
            };

            const redirectPath = profileRoutes[userRole] || "/dashboard";
            if (redirectPath !== location.pathname) {
                navigate(redirectPath, { replace: true });
            }
        }
    }, [location.pathname, userRole, navigate]);

    const getRoleDisplayName = (role) => {
        const roleMap = {
            user: "User",
            lawyer: "Lawyer",
            arbitrator: "Arbitrator",
            mediator: "Mediator",
            admin: "Administrator",
        };
        return roleMap[role] || "User";
    };

    const userLinks = [
        {
            name: "Profile",
            path: "/dashboard/user-profile",
            icon: <FaDashcube className="text-lg" />,
        },
        {
            name: "My Appointments",
            path: "/dashboard/my-appointments",
            icon: <FaGavel className="text-lg" />,
        }
    ];

    const lawyerLinks = [
        {
            name: "Profile",
            path: "/dashboard/lawyer-profile",
            icon: <FaUser className="text-lg" />,
        },
        {
            name: "Appointments",
            path: "/dashboard/appointments",
            icon: <FaGavel className="text-lg" />,
        },
    ];

    const arbitratorLinks = [
        {
            name: "Profile",
            path: "/dashboard/arbitrator-profile",
            icon: <FaUser className="text-lg" />,
        },
        {
            name: "Cases",
            path: "/dashboard/cases",
            icon: <FaBalanceScale className="text-lg" />,
        },
    ];

    const mediatorLinks = [
        {
            name: "Profile",
            path: "/mediator-profile",
            icon: <FaUser className="text-lg" />,
        },
        {
            name: "Sessions",
            path: "/sessions",
            icon: <FaHandshake className="text-lg" />,
        },
    ];

    const adminLinks = [
        {
            name: "All Users",
            path: "/all-users",
            icon: <FaUsers className="text-lg" />,
        },
        {
            name: "All Lawyers",
            path: "/all-lawyers",
            icon: <FaGavel className="text-lg" />,
        },
        {
            name: "All Arbitrators",
            path: "/all-arbitrators",
            icon: <FaBalanceScale className="text-lg" />,
        },
        {
            name: "All Mediators",
            path: "/all-mediators",
            icon: <FaHandshake className="text-lg" />,
        },
    ];

    const getLinksForRole = () => {
        switch (userRole) {
            case "lawyer":
                return lawyerLinks;
            case "arbitrator":
                return arbitratorLinks;
            case "mediator":
                return mediatorLinks;
            case "admin":
                return adminLinks;
            default:
                return userLinks;
        }
    };

    const menuItems = getLinksForRole();

    const handleNavigation = (path, name) => {
        navigate(path);
        setActiveItem(name);
    };

    // Enhanced active link detection
    const isActiveLink = (path) => {
        // Special case for dashboard redirection
        if (location.pathname === "/dashboard" && path === "/dashboard") {
            return userRole === "user"; // Only active for regular users
        }

        // For profile pages, also consider if we were redirected from dashboard
        const profileRoutes = {
            lawyer: "/lawyer-profile",
            arbitrator: "/arbitrator-profile",
            mediator: "/mediator-profile",
            admin: "/all-users",
        };

        // If current path matches, or if we're on a profile route and it matches the user's profile
        return (
            location.pathname === path ||
            (location.pathname === profileRoutes[userRole] &&
                path === profileRoutes[userRole])
        );
    };

    // Set active item based on current route
    useEffect(() => {
        const currentItem = menuItems.find((item) => isActiveLink(item.path));
        if (currentItem) {
            setActiveItem(currentItem.name);
        }
    }, [location.pathname, menuItems]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div
            className={`relative h-full bg-gradient-to-b from-teal-800 to-teal-900 text-white transition-all duration-300 ${
                isCollapsed ? "w-24" : "w-72"
            }`}
        >
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-6 bg-teal-700 hover:bg-teal-600 text-white p-2 rounded-full border-2 border-white shadow-lg transition-all duration-300 z-10"
            >
                {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>

            {/* Header */}
            <div className="p-6 border-b border-teal-700">
                <div className="flex items-center space-x-3">
                    <div className="bg-teal-500 p-2 rounded-lg">
                        <FaHeart className="text-white text-2xl" />
                    </div>
                    {!isCollapsed && (
                        <div>
                            <h2 className="text-xl font-bold">LegalConnect</h2>
                            <p className="text-teal-200 text-sm">
                                {getRoleDisplayName(userRole)} Portal
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-6">
                <ul className="space-y-2 px-4">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() =>
                                    handleNavigation(item.path, item.name)
                                }
                                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:bg-teal-700 hover:transform hover:scale-105 ${
                                    isActiveLink(item.path)
                                        ? "bg-white text-teal-700 shadow-lg font-semibold"
                                        : "text-teal-100"
                                }`}
                            >
                                <span
                                    className={`${
                                        isActiveLink(item.path)
                                            ? "text-teal-600"
                                            : "text-white"
                                    }`}
                                >
                                    {item.icon}
                                </span>
                                {!isCollapsed && (
                                    <span className="text-sm capitalize">
                                        {item.name}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 w-full p-4 border-t border-teal-700">
                <div className="flex items-center space-x-3 mb-4 p-3 rounded-lg hover:bg-teal-700 transition-colors duration-200">
                    <figure className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                        <img
                            className="w-11 h-11 rounded-full"
                            src={currentUser.photo}
                            alt=""
                        />
                    </figure>
                    {!isCollapsed && (
                        <div>
                            <p className="text-sm font-medium">
                                {currentUser.name}
                            </p>
                            <p className="text-xs text-teal-200">
                                {getRoleDisplayName(userRole)}
                            </p>
                        </div>
                    )}
                </div>

                <Link
                    to="/"
                    className="flex items-center space-x-3 p-3 rounded-lg text-teal-100 hover:bg-teal-700 transition-colors duration-200"
                >
                    <FaHome className="text-white" />
                    {!isCollapsed && (
                        <span className="text-sm">Go to Home</span>
                    )}
                </Link>
            </div>

            {/* Decorative Elements */}
            {!isCollapsed && (
                <>
                    <div className="absolute top-1/4 -left-2 w-4 h-4 bg-teal-500 rounded-full opacity-50"></div>
                    <div className="absolute bottom-1/3 -left-1 w-3 h-3 bg-teal-400 rounded-full opacity-30"></div>
                    <div className="absolute top-2/3 left-4 w-2 h-2 bg-teal-300 rounded-full opacity-40"></div>
                </>
            )}
        </div>
    );
};

export default DashboardLeft;
