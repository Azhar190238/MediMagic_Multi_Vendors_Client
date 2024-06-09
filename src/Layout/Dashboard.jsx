
import { FaBook, FaCalendar, FaHome, FaList, FaPaypal, FaUsers } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useSeller from "../Hooks/useSeller";
import { BiCategory } from "react-icons/bi";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isSeller] = useSeller();
    return (
        <div className="flex p-8">
            {/* Dashboard sidebar content */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink to='/dashboard/adminHome'>
                                    <FaHome /> Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/adminCategories'>
                                <BiCategory/> Manage Categories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/managePayment'>
                                    <FaList /> Payment Management
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/salesReport'>
                                    <FaBook /> Sales Report
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/adminAdvertise'>
                                    <FaBook /> Manage Banner Advertise
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allUsers'>
                                    <FaUsers /> ALL USERS
                                </NavLink>
                            </li>
                        </>
                    ) : isSeller ? (
                        <>
                            <li>
                                <NavLink to='/dashboard/sellerHome'>
                                    <FaHome /> Seller HOME
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageMedicine'>
                                    <FaCalendar /> Manage Medicines
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/paymentHistorySeller'>
                                    <FaPaypal /> Payment History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/advertisement'>
                                    <FaList /> Ask for Advertisement
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to='/dashboard/userHome'>
                                    <FaHome /> User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/paymentHistory'>
                                    <FaPaypal /> Payment History
                                </NavLink>
                            </li>
                        </>
                    )}
                    <div className="divider"></div>

                    <li >
                        <NavLink to='/'>
                            <FaHome /> HOME
                        </NavLink>
                    </li>
                    <li >
                        <NavLink to='/shop'>
                            <FaList /> Shop
                        </NavLink>
                    </li>
                    <li >
                        <NavLink to='/addCart'>
                            <FaShop />ORDER SHOP
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>

        </div>
    );
};
 export default Dashboard;
