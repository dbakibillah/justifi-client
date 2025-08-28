import { Helmet } from "react-helmet";
import Banner from "./components/Banner";
import Banner2 from "./components/Banner2";
import Banner3 from "./components/Banner3";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | justiFi</title>
            </Helmet>
            
            <Banner />
            <Banner2 />
            <Banner3 />
        </div>
    );
};

export default Home;
