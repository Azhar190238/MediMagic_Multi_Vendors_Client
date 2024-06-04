import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../Hooks/UseAxios";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = UseAxios();

    // tanstack query used for advantages to refetch function 
    const { data: users = [] ,refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handelDeleteUser = user =>{
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
            
                axiosSecure.delete(`/users/${user._id}`)
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

    const handelMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data);
            if(res.data.modifiedCount >0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is now an admin`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  refetch();
             }
        })

    }
    return (
        <div>
            <div>
                <h2 className="text-4xl font-bold">Total Users : {users.length} </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index+1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                 <td>
                                    {/* <button  */}
                                   {
                                    user.role === 'admin' ? 'Admin':<button  onClick={() => handelMakeAdmin(user) }
                                    className="btn bg-orange-500 "> 
                                    <FaUsers className="text-xl text-white" /> 
                                    </button>
                                   }
                                </td>
                                <td>
                                    {/* <button  */}
                                     <button onClick={() => handelDeleteUser(user)} className="btn btn-ghost bg-red-500 "> <FaTrashAlt className="text-xl text-white" /> </button>
                                </td>
                            </tr>)
                        }
                       

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;