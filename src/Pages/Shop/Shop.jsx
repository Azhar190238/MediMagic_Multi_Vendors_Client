
// import UseMedicineCart from "../../Hooks/UseMedicineCart";
// import SectionTitle from "../Shared/Section/SectionTitle";


// const Shop = () => {
//     const [carts] = UseMedicineCart();



//     return (
//         <div className="my-20 mx-16">
//             <SectionTitle subHeading="Please buy here!!" heading="Shop Medicine"
//             ></SectionTitle>

//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
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
//                         {carts.map((item, index) => (
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
//                                 <td><button className="btn btn-primary">Add Cart</button></td>
//                                 <td>
//                                     <button className="btn btn-secondary" onClick={() => document.getElementById('my_modal_4').showModal()}>Details</button>
//                                     <dialog id="my_modal_4" className="modal">
//                                         <div className="modal-box w-11/12 max-w-5xl">
//                                             <div className="hero min-h-screen bg-base-200">
//                                                 <div className="hero-content flex-col lg:flex-row">
//                                                     <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
//                                                     <div>
//                                                         <h1 className="text-5xl font-bold">{item.itemName}</h1>
//                                                         <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
//                                                         <button className="btn btn-primary">Get Started</button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="modal-action">
//                                                 <form method="dialog">
//                                                     {/* if there is a button, it will close the modal */}
//                                                     <button className="btn">Close</button>
//                                                 </form>
//                                             </div>
//                                         </div>
//                                     </dialog>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Shop;


import { useState } from 'react';
import UseMedicineCart from "../../Hooks/UseMedicineCart";
import SectionTitle from "../Shared/Section/SectionTitle";

const Shop = () => {
    const [carts] = UseMedicineCart();
    const [selectedItem, setSelectedItem] = useState(null);

    const medicineItemDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/carts/${id}`);
            const data = await response.json();
            setSelectedItem(data);
            document.getElementById('my_modal_4').showModal();
        } catch (error) {
            console.error("Error fetching item details:", error);
        }
    };

    return (
        <div className="my-20 mx-16">
            <SectionTitle subHeading="Please buy here!!" heading="Shop Medicine" />

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
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
                        {carts.map((item, index) => (
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
                                <td><button className="btn btn-primary">Add Cart</button></td>
                                <td>
                                    <button className="btn btn-secondary" onClick={() => medicineItemDetails(item._id)}>Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedItem && (
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        {/* <div className="hero min-h-screen bg-base-200"> */}
                        {/* <div className="hero-content flex-col lg:flex-row">
                                <img src={selectedItem.image} className="max-w-sm rounded-lg shadow-2xl" alt="Medicine" />
                                <div>
                                    <h1 className="text-5xl font-bold">{selectedItem.itemName}</h1>
                                    <p className="py-6">{selectedItem.description}</p>
                                    <button className="btn btn-primary">Get Started</button>
                                </div>
                            </div>

                        </div> */}

                        <div className=" bg-base-200">
                            <div className="hero-content flex-col lg:flex-row">
                                <div className=" h-full">
                                    <img src={selectedItem.image} className="max-w-sm md:h-[500px] rounded-lg shadow-2xl" />
                                </div>

                                <div className="pl-10 space-y-4 ">
                                    <h1 className="text-2xl font-bold"><span className="text-3xl" >Medicine Name:</span> {selectedItem.itemName}</h1>
                                    <div className="flex space-x-3">
                                        <p className="text-lg font-bold"><span className="text-xl font-bold" >Medicine Generic Name:</span> {selectedItem.genericName}</p>

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
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Short description: </span>  {selectedItem.description}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                    {/* </div> */}
                </dialog>
            )}
        </div>
    );
};

export default Shop;
