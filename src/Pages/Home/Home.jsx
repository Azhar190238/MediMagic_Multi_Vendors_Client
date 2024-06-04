// import { Helmet } from "react-helmet-async";
import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import CategoryCard from "./CategoryCard/CategoryCard";
import Contact from "./Contact/Contact";
import PopularMenu from "./PopularMenu/PopularMenu";
import ReaderQuestion from "./ReaderQuestion/ReaderQuestion";
import Statistics from "./Statistics/Statistics";
import DiscountMedicine from "./DiscountMedicine/DiscountMedicine";

const Home = () => {
    return (
        <div className="my-10 space-y-10">
            <Helmet>
                <title>MediMagic | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
             <CategoryCard></CategoryCard>
             <DiscountMedicine></DiscountMedicine>
             <Contact></Contact>
             <Statistics></Statistics>
             <ReaderQuestion></ReaderQuestion>

        </div>
    );
};

export default Home;