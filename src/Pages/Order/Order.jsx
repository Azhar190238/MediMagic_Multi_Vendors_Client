
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import UseMedicineCart from '../../Hooks/UseMedicineCart';
// import Cart from '../Home/CategoryCard/Cart/Cart';
// const Order = () => {
//     const categories = ['analgesic', 'pizza','soups', 'desserts', 'drinks']
//     const {category} =useParams();
//     const initialIndex = categories.indexOf(category);

//     const [tabIndex, setTabIndex] = useState(initialIndex);
//     // const [carts] = Usecarts();
//     const [carts] = UseMedicineCart();

//     const analgesic = carts.filter(item => item.category === 'analgesic')
//     const anti_inflammatory = carts.filter(item => item.category === 'anti_inflammatory')
//     const Antibiotic = carts.filter(item => item.category === 'Antibiotic')
//     const soup = carts.filter(item => item.category === 'soup')
//     const drink = carts.filter(item => item.category === 'drinks')
//     return (
//         <div className="my-10 space-y-6">
//               <Helmet>
//                 <title>Bistro Boss | Order</title>
//             </Helmet>


//             <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
//                 <TabList className='uppercase'>
//                     <Tab>Analgesic</Tab>
//                     <Tab>Anti-inflammatory</Tab>
//                     <Tab>Antibiotic</Tab>
//                     <Tab>desserts</Tab>
//                     <Tab>Drinks</Tab>
//                 </TabList>
//                 <TabPanel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-5">
//                 {
//                     analgesic.map(cart => <Cart
//                          key={cart._id}
//                          cart={cart}></Cart>)
//                 }
//             </div>
//                 </TabPanel>
//                 <TabPanel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {
//                     anti_inflammatory.map(cart => <Cart
//                          key={cart._id}
//                          cart={cart}></Cart>)
//                 }
//             </div>
//                 </TabPanel> 

//                 <TabPanel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {
//                     Antibiotic.map(cart => <Cart
//                         key={cart._id}
//                         cart={cart}></Cart>)
//                 }
//             </div>
//                 </TabPanel>
//                 {/* <TabPanel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {
//                     dessert.map(recommend => <RecommendCard
//                          key={recommend._id}
//                          recommend={recommend}></RecommendCard>)
//                 }
//             </div>
//                 </TabPanel>
//                 <TabPanel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {
//                     drink.map(recommend => <RecommendCard
//                          key={recommend._id}
//                          recommend={recommend}></RecommendCard>)
//                 }
//             </div>
//                 </TabPanel>  */}

//             </Tabs>
//         </div>
//     );
// };

// export default Order;




// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import UseMedicineCart from "../../Hooks/UseMedicineCart";
// import SectionTitle from "../Shared/Section/SectionTitle";
// import { GoEye } from 'react-icons/go';
// import Swal from 'sweetalert2';
// import UseAuth from '../../Hooks/UseAuth';
// import UseAxios from '../../Hooks/UseAxios';

// const Order = () => {
//     const { category } = useParams();  // Get the category from the route parameter
//     const [carts, refetch] = UseMedicineCart();
//     const [filteredCarts, setFilteredCarts] = useState([]);
//     const [selectedItem, setSelectedItem] = useState(null);
//     const { user } = UseAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const axiosSecure = UseAxios();
//     // here carts is an arrary 
//     const handelCard = () => {

//         if (user && user.email) {

//             /// send cart item to database
//             const cartItem = {
//                 cartId: _id,
//                 email: user.email,
//                 name,
//                 price,
//                 image
//             }
//             axiosSecure.post('/addCart', cartItem)
//                 .then(res => {
//                     console.log(res.data);
//                     if (res.data.insertedId) {

//                         Swal.fire({
//                             position: "top-end",
//                             icon: "success",
//                             title: `${name} added to your Cart`,
//                             showConfirmButton: false,
//                             timer: 1500
//                         });
//                         // refetch cart to updated the cart items
//                         refetch()
//                     }
//                 })


//         }
//         else {
//             Swal.fire({
//                 title: "You are not Login",
//                 text: "Please Log in!",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#3085d6",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Yes Log In"
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     navigate('/login', { state: { from: location } })
//                 }
//             });
//         }
//     }

//     useEffect(() => {
//         // Filter the carts based on the category
//         setFilteredCarts(carts.filter(item => item.category === category));
//     }, [carts, category]);

//     const medicineItemDetails = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/carts/${id}`);
//             const data = await response.json();
//             setSelectedItem(data);
//             document.getElementById('my_modal_4').showModal();
//         } catch (error) {
//             console.error("Error fetching item details:", error);
//         }
//     };

//     return (
//         <div className="my-20 mx-16">
//             <SectionTitle subHeading="Please buy here!!" heading="Shop Medicine" />

//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     <thead>
//                         <tr>
//                             <th>SERIAL</th>
//                             <th>IMAGE</th>
//                             <th>Medicine NAME</th>
//                             <th>Category</th>
//                             <th>Company NAME</th>
//                             <th>Item Mass Unit</th>
//                             <th>PRICE</th>
//                             <th>Buy</th>
//                             <th>Details</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredCarts.map((item, index) => (
//                             <tr key={item._id}>
//                                 <td>{index + 1}</td>
//                                 <td>
//                                     <div className="flex items-center gap-3">
//                                         <div className="avatar">
//                                             <div className="mask mask-squircle w-12 h-12">
//                                                 <img src={item.image} alt="Medicine" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td>{item.itemName}</td>
//                                 <td>{item.category}</td>
//                                 <td>{item.company}</td>
//                                 <td>{item.massUnit}</td>
//                                 <td>${item.price}</td>
//                                 <td><button onClick={handelCard} className="btn btn-primary">Add Cart</button></td>
//                                 <td>
//                                     <button className="btn btn-secondary" onClick={() => medicineItemDetails(item._id)}><GoEye className='text-xl' /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {selectedItem && (
//                 <dialog id="my_modal_4" className="modal">
//                     <div className="modal-box w-11/12 max-w-5xl">
//                         <div className=" bg-base-200">
//                             <div className="hero-content flex-col lg:flex-row">
//                                 <div className=" h-full">
//                                     <img src={selectedItem.image} className="max-w-sm md:h-[500px] rounded-lg shadow-2xl" />
//                                 </div>

//                                 <div className="pl-10 space-y-4 ">
//                                     <h1 className="text-2xl font-bold"><span className="text-3xl">Medicine Name:</span> {selectedItem.itemName}</h1>
//                                     <div className="flex space-x-3">
//                                         <p className="text-lg font-bold"><span className="text-xl font-bold">Medicine Generic Name:</span> {selectedItem.genericName}</p>
//                                     </div>
//                                     <div className="flex space-x-3">
//                                         <p className="w-full text-lg"><span className="font-bold text-xl">Medicine Category: </span> {selectedItem.category}</p>
//                                     </div>
//                                     <div className="flex space-x-3">
//                                         <p className="w-full text-lg"><span className="font-bold text-xl">Medicine Company: </span> {selectedItem.company}</p>
//                                     </div>
//                                     <div className="flex space-x-3">
//                                         <p className="w-full text-lg"><span className="font-bold text-xl">Medicine Mass Unit: </span> {selectedItem.massUnit}</p>
//                                     </div>
//                                     <div className="flex space-x-3">
//                                         <p className="w-full text-lg"><span className="font-bold text-xl">Per Unit Price: </span> ${selectedItem.price}</p>
//                                     </div>
//                                     <div className="flex space-x-3">
//                                         <p className="w-full text-lg"><span className="font-bold text-xl">Discount Percentage: </span> {selectedItem.disCountPrice}</p>
//                                     </div>
//                                     <div className="flex space-x-3">
//                                         <p className="w-full text-lg"><span className="font-bold text-xl">Short description: </span> {selectedItem.description}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="modal-action">
//                             <form method="dialog">
//                                 <button className="btn">Close</button>
//                             </form>
//                         </div>
//                     </div>
//                 </dialog>
//             )}
//         </div>
//     );
// };

// export default Order;

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UseMedicineCart from "../../Hooks/UseMedicineCart";
import SectionTitle from "../Shared/Section/SectionTitle";
import { GoEye } from 'react-icons/go';
import Swal from 'sweetalert2';
import UseAuth from '../../Hooks/UseAuth';
import UseAxios from '../../Hooks/UseAxios';

const Order = () => {
    const { category } = useParams();  // Get the category from the route parameter
    const [carts, refetch] = UseMedicineCart();
    const [filteredCarts, setFilteredCarts] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = UseAxios();

    useEffect(() => {
        // Filter the carts based on the category
        setFilteredCarts(carts.filter(item => item.category === category));
    }, [carts, category]);

    const handelCard = (item) => {
        if (user && user.email) {
            // send cart item to database
            const cartItem = {
                cartId: item._id,
                email: user.email,
                name: item.itemName,
                price: item.price,
                image: item.image
            };
            axiosSecure.post('/addCart', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${item.itemName} added to your Cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart to update the cart items
                        refetch();
                    }
                });
        } else {
            Swal.fire({
                title: "You are not Login",
                text: "Please Log in!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes Log In"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    const medicineItemDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/carts/${id}`);
            const data = await response.json();
            setSelectedItem(data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching item details:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <div className="my-20 mx-16">
            <SectionTitle subHeading="Please buy here!!" heading="Shop Medicine" />

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>SERIAL</th>
                            <th>IMAGE</th>
                            <th>Medicine NAME</th>
                            <th>Category</th>
                            <th>Company NAME</th>
                            <th>Item Mass Unit</th>
                            <th>PRICE</th>
                            <th>Buy</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCarts.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Medicine" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.itemName}</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td>{item.massUnit}</td>
                                <td>${item.price}</td>
                                <td><button onClick={() => handelCard(item)} className="btn btn-primary">Add Cart</button></td>
                                <td>
                                    <button className="btn btn-secondary" onClick={() => medicineItemDetails(item._id)}><GoEye className='text-xl' /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedItem && (
                <dialog open className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <div className=" bg-base-200">
                            <div className="hero-content flex-col lg:flex-row">
                                <div className=" h-full">
                                    <img src={selectedItem.image} className="max-w-sm md:h-[500px] rounded-lg shadow-2xl" />
                                </div>

                                <div className="pl-10 space-y-4 ">
                                    <h1 className="text-2xl font-bold"><span className="text-3xl">Medicine Name:</span> {selectedItem.itemName}</h1>
                                    <div className="flex space-x-3">
                                        <p className="text-lg font-bold"><span className="text-xl font-bold">Medicine Generic Name:</span> {selectedItem.genericName}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Medicine Category: </span> {selectedItem.category}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Medicine Company: </span> {selectedItem.company}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Medicine Mass Unit: </span> {selectedItem.massUnit}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Per Unit Price: </span> ${selectedItem.price}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Discount Percentage: </span> {selectedItem.disCountPrice}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Short description: </span> {selectedItem.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button onClick={closeModal} className="btn">Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default Order;
