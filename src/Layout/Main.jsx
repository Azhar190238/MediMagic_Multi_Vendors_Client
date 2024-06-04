import { Outlet, useLocation } from "react-router-dom";
import Header from "../Pages/Shared/Header/Header";
import Footer from "../Pages/Shared/Footer/Footer";


const Main = () => {
    const location = useLocation();
    const notHeaderFooter = location.pathname.includes('login')|| location.pathname.includes('signUp')
    return (
        <div>
           {notHeaderFooter || <Header></Header> } 
            <Outlet></Outlet>
            {notHeaderFooter || <Footer></Footer> } 
            
        </div>
    );
};

export default Main;