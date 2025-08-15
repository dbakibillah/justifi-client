import {
    memo,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { BsBoxArrowRight, BsGrid3X3Gap, BsList } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProviders";

const SERVICES = [
    { name: "ADR", path: "/adr" },
    { name: "ODR", path: "/odr" },
];

const NAV_LINKS = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Forum", path: "/forum", authOnly: true },
    { name: "Attorneys", path: "/attorneys" },
    { name: "ADR/ODR", path: "/adr-odr" },
    { name: "Blog", path: "/blog" },
    { name: "Resources", path: "/resources" },
];

const NavItem = ({ children, to, className = "" }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-all text-sm ${
                isActive
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-gray-700 hover:bg-gray-100"
            } ${className}`
        }
    >
        {children}
    </NavLink>
);

const ServicesDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggle = useCallback((e) => {
        e?.stopPropagation();
        setIsOpen((prev) => !prev);
    }, []);

    const closeDropdown = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && closeDropdown();
        const handleClickOutside = (e) => {
            if (
                isOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, closeDropdown]);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={toggle}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all text-sm ${
                    isOpen
                        ? "text-primary font-semibold bg-primary/10"
                        : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                Services
                <IoMdArrowDropdown
                    className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <ul
                    className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    role="menu"
                >
                    {SERVICES.map((service) => (
                        <li key={service.path} role="none">
                            <NavLink
                                to={service.path}
                                onClick={closeDropdown}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 text-sm transition-colors ${
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-gray-700 hover:bg-gray-100"
                                    } first:rounded-t-lg last:rounded-b-lg`
                                }
                                role="menuitem"
                            >
                                {service.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const UserDropdown = memo(({ user, onLogout }) => {
    const userPhoto = user.photoURL || "https://via.placeholder.com/150";

    return (
        <div className="dropdown dropdown-end">
            <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar group"
            >
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-white transition-all duration-300 group-hover:ring-offset-4">
                    <img
                        src={userPhoto}
                        alt="User Avatar"
                        className="object-cover"
                    />
                </div>
            </label>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-white rounded-box w-64 space-y-1 border border-gray-100 z-50"
            >
                <li className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={userPhoto} alt="User Avatar" />
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 truncate">
                                {user.displayName || "User"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user.email || "Welcome back!"}
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <BsGrid3X3Gap className="w-5 h-5 mr-2" />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <button
                        onClick={onLogout}
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors w-full text-left"
                    >
                        <BsBoxArrowRight className="w-5 h-5 mr-2" />
                        Log Out
                    </button>
                </li>
            </ul>
        </div>
    );
});

const GuestActions = memo(() => (
    <div className="flex space-x-2">
        <Link
            to="/login"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:from-secondary hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
            Login
        </Link>
    </div>
));

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleLogout = useCallback(() => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    title: "Logged out!",
                    text: "You've been successfully logged out.",
                    icon: "success",
                    background: "#ffffff",
                    color: "#000000",
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                    background: "#ffffff",
                    color: "#000000",
                });
            });
    }, [signOutUser]);

    const filteredLinks = NAV_LINKS.filter((link) => !link.authOnly || user);

    return (
        <section className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
            <div className="navbar container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Logo & Mobile Menu */}
                <div className="navbar-start">
                    {/* Mobile Hamburger Menu */}
                    <div className="dropdown lg:hidden">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost hover:bg-gray-100"
                        >
                            <BsList className="h-6 w-6" />
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-white rounded-box w-64 space-y-1 border border-gray-100"
                        >
                            {filteredLinks.map((link) => (
                                <li key={link.path}>
                                    <NavItem to={link.path}>
                                        {link.name}
                                    </NavItem>
                                </li>
                            ))}
                            <li>
                                <ServicesDropdown />
                            </li>
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold text-primary">
                            Justifi
                        </h1>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center space-x-1">
                        {filteredLinks.map((link) => (
                            <li key={link.path}>
                                <NavItem to={link.path}>{link.name}</NavItem>
                            </li>
                        ))}
                        <li>
                            <ServicesDropdown />
                        </li>
                    </ul>
                </div>

                {/* User/Auth Actions */}
                <div className="navbar-end space-x-4">
                    {user ? (
                        <UserDropdown user={user} onLogout={handleLogout} />
                    ) : (
                        <GuestActions />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Navbar;
