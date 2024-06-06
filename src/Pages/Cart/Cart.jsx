
import Swal from "sweetalert2";
import SectionTitle from "../Shared/Section/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import UseAxios from "../../Hooks/UseAxios";
import { Link } from "react-router-dom";
import UseCart from "../../Hooks/UseCart";
import { useState } from "react";

const Cart = () => {
    const [cart, refetch] = UseCart();
    const [quantities, setQuantities] = useState(cart.map(() => 1)); // Default quantity is 1 for each item
    const axiosSecure = UseAxios();

    const updateTotalPrice = () => {
        return cart.reduce((total, item, index) => total + item.price * quantities[index], 0);
    };

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/addCart/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const handleQuantityChange = (index, delta) => {
        const newQuantities = [...quantities];
        newQuantities[index] = Math.max(1, newQuantities[index] + delta); // Prevent quantity from being less than 1
        setQuantities(newQuantities);
    };

    return (
        <div>
            <SectionTitle
                heading='WANNA ADD MORE?'
                subHeading='My Cart'
            />
            <div className="flex justify-evenly mb-8">
                <h2 className="text-4xl font-bold">Total Items: {cart.length}</h2>
                <h2 className="text-4xl font-bold">Total Price: ${updateTotalPrice()}</h2>
                {cart.length ? <Link to={'/dashboard/payment'}><button className="btn btn-primary">Payment</button></Link>
                    : <button disabled className="btn btn-primary">Payment</button>
                }
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>SERIAL</th>
                            <th>ITEM IMAGE</th>
                            <th>ITEM NAME</th>
                            <th>Company</th>
                            <th>PRICE PER UNIT</th>
                            <th>PRICE</th>
                            <th>Quantity</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.company}</td>
                                <td>${item.price}</td>
                                <td>${item.price * quantities[index]}</td>
                                <td>
                                    <div className="flex items-center">
                                        <button className="btn btn-sm btn-primary" onClick={() => handleQuantityChange(index, -1)}>-</button>
                                        <span className="mx-2">{quantities[index]}</span>
                                        <button className="btn btn-sm btn-primary" onClick={() => handleQuantityChange(index, 1)}>+</button>
                                    </div>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost btn-xs">
                                        <FaTrashAlt className="text-2xl text-red-400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;
