import { Outlet } from "react-router";

const Root = () => {
    return (
        <section>
            Navbar
            <Outlet />
            footer
        </section>
    );
};

export default Root;