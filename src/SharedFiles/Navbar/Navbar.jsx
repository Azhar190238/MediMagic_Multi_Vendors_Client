

import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { Tooltip } from 'react-tooltip'
import { authContext } from "../../Providers/AuthProvider";
import { BsCartCheck } from "react-icons/bs";

const Navbar = () => {
    const { user, logOut } = useContext(authContext);

    const handleSignOut = () => {
        logOut()
            .then()
            .catch();
    }

    const navLinks = (
        <>

            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/shop'> Shop</NavLink></li>
            <li><NavLink to='/featureBlog'> <BsCartCheck className="text-2xl" /> </NavLink></li>
            <li><NavLink to='/featureBlog'> <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" >Language</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow  rounded-box w-52">
                    <li><a>English</a></li>
                    <li><a>Bangla</a></li>
                </ul>
            </div> </NavLink></li>
            {user && (
                <>
                    <li><NavLink to='/addBlog'> My Profile</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to='/' className="flex items-center">
                        <div className="flex items-center space-x-1 md:space-x-2">
                            <img className="w-12" src="https://i.ibb.co/YdL3J1T/R.jpg" alt="" />
                            <a className="text-md  md:text-3xl">Medi<span className="text-red-500">M</span>agic</a>
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                {user ? (
                    <div className="navbar-end gap-1 md:gap-3">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className=" rounded-full relative">
                                    <div className="w-10">
                                        <img
                                            alt="User Avatar"
                                            src={user.photoURL || 'https://i.postimg.cc/506PW3dk/user.png'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="absolute top-0 left-0 bg-black bg-opacity-75 text-white text-[7px] px-1 rounded-b opacity-0 hover:opacity-100 transition-opacity">
                                            {user.displayName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <Link><li><button>Updated Profile</button></li></Link>
                               <Link><li><button>Dashboard</button></li></Link> 
                                <li onClick={handleSignOut}> <button>Log Out</button></li>
                            </ul>
                        </div>
                        <button onClick={handleSignOut} className="btn"><a id="clickable" className="btn  my-anchor-element">Log Out</a>
                            <Tooltip anchorSelect="#clickable" clickable>
                                <p className="">Are You sure?</p>
                            </Tooltip></button>
                    </div>
                ) : (
                    <div className="navbar-end gap-3">
                        <img className="w-10 rounded-full" src={'https://i.postimg.cc/506PW3dk/user.png'} alt="User Avatar" />
                        <Link to='/login'> <a className="btn">Join US</a></Link>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;





