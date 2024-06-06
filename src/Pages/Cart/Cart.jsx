import Swal from "sweetalert2";
import SectionTitle from "../Shared/Section/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import UseAxios from "../../Hooks/UseAxios";
import { Link } from "react-router-dom";
import UseCart from "../../Hooks/UseCart";
const Cart = () => {
    const [cart, refetch] = UseCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const axiosSecure = UseAxios();
    const handelDelete = id => {
        refetch();
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
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                           
                        }
                    })
            }
        });
    }
    return (
        <div>
            <SectionTitle
                heading='WANNA ADD MORE?'
                subHeading='My Cart'
            ></SectionTitle>
            <div className="flex justify-evenly mb-8">
                <h2 className="text-4xl font-bold">Total Items: {cart.length}</h2>
                <h2 className="text-4xl font-bold">Total Price: ${totalPrice}</h2>
                {cart.length ? <Link to={'/dashboard/payment'}><button className="btn btn-primary">Payment</button></Link>
                    :<button disabled className="btn  btn-primary">Payment</button>
                }
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                SERIAL
                            </th>
                            <th>ITEM IMAGE</th>
                            <th>ITEM NAME</th>
                            <th>Company</th>
                            <th>PRICE PER UNIT</th>
                            <th>Quantity</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.company}
                                </td>
                                <td>${item.price}</td>
                                <td>Quantity</td>
                                <th>
                                    <button onClick={() => handelDelete(item._id)}
                                        className="btn btn-ghost btn-xs"> <FaTrashAlt className="text-2xl text-red-400" /> </button>
                                </th>
                            </tr>)
                        }




                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Cart;