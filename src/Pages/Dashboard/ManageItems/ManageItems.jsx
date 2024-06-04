import { FaEdit, FaTrashAlt } from "react-icons/fa";
import UseMenu from "../../../Hooks/UseMedicineCart";
import SectionTitle from "../../Shared/Section/SectionTitle";
import Swal from "sweetalert2";
import UseAxios from "../../../Hooks/UseAxios";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, , refetch] = UseMenu();
    const axiosSecure = UseAxios();
    const handelDeleteItem = (item) => {
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

                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    }
    const handelUpdatedItem = (item) => {

    }
    return (
        <div>
            <SectionTitle
                heading='manage all items'
                subHeading='Hurry Up!'></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Recipe Image</th>
                                <th>Recipe NAme</th>
                                <th>Price</th>
                                <th>Action(Edit)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => <tr key={item._id}>
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
                                    <td>$ {item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/updatedItems/${item._id}`}><button 
                                            className="btn bg-orange-500 ">
                                            <FaEdit className="text-xl text-white" />



                                        </button></Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handelDeleteItem(item)} className="btn btn-ghost bg-red-500 "> <FaTrashAlt className="text-xl text-white" /> </button>
                                    </td>
                                </tr>)
                            }




                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;