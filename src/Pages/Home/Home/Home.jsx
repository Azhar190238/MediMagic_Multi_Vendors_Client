import ReaderQuestion from "../ReaderQuestion/ReaderQuestion";
import Statistics from "../Statistics/Statistics";
import { Helmet } from "react-helmet-async";

const Home = () => {

    return (
        <div>
            <div>
                <Helmet>
                    <title> MediMagic | Home</title>
                </Helmet>
            </div>
            <h2 className="text-2xl">Home pages</h2>
            <Statistics></Statistics>
            <ReaderQuestion></ReaderQuestion>
        </div>
    );
};

export default Home;