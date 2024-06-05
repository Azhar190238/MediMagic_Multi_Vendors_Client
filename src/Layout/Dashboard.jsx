
import { FaBook, FaCalendar, FaCartPlus, FaEnvelope, FaHome, FaList, FaPaypal, FaRev, FaUsers, FaUtensils } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import UseCart from "../Hooks/UseCart";
import useAdmin from "../Hooks/useAdmin";
import useSeller from "../Hooks/useSeller";

const Dashboard = () => {
    const [cart] = UseCart();
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
                                    <FaHome /> ADMIN HOME
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/addItems'>
                                    <FaUtensils /> Manage Categories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/managePayment'>
                                    <FaList /> Payment Management
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageBookings'>
                                    <FaBook /> Sales Report
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageAdvertise'>
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
                                <NavLink to='/dashboard/paymentHistory'>
                                    <FaPaypal /> PAYMENT HISTORY
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/booking'>
                                    <FaList /> MY Adding List 
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to='/dashboard/userHome'>
                                    <FaHome /> USER HOME
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/reservation'>
                                    <FaCalendar /> RESERVATION
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/paymentHistory'>
                                    <FaPaypal /> PAYMENT HISTORY
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/cart'>
                                    <FaCartPlus /> MY CART ({cart.length})
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/review'>
                                    <FaRev /> ADD REVIEW
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/booking'>
                                    <FaList /> MY BOOKING
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
                        <NavLink to='/order/salad'>
                            <FaShop />ORDER SHOP
                        </NavLink>
                    </li>
                    <li >
                        <NavLink to='/CONTACT'>
                            <FaEnvelope />Contact Us
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
