import { Outlet } from "react-router-dom";
import Navbar from "../SharedFiles/Navbar/Navbar";
import Footer from "../SharedFiles/Footer/Footer";



const Main = () => {
    return (

        <div className="mx-5 my-8">
            <div className=" md:10 lg:mx-20">
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>

    );
};

export default Main;