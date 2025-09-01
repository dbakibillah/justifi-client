import Banner from './components/Banner';
import Banner2 from './components/Banner2';
import Banner3 from './components/Banner3';
import Banner4 from './components/Banner4';


import { Helmet } from "react-helmet";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | justiFi</title>
            </Helmet>
            
            <Banner />
            <Banner2 />
            <Banner3 />
            <Banner4 />

        </div>
    );
};

export default Home;
