
import { useState } from "react";
import UseAdvertisementCart from "../../../Hooks/UseAdvertisementCart";
import Swal from "sweetalert2";
import UseAxios from "../../../Hooks/UseAxios";

const AdminAdvertisement = () => {
    const [advertisement, loading, refetch] = UseAdvertisementCart();
    const axiosSecure = UseAxios();
    const [loadingState, setLoadingState] = useState({});

    const handleToggleStatus = async (id, currentStatus) => {
        setLoadingState(prevState => ({ ...prevState, [id]: true }));
        const newStatus = currentStatus === 'advertise-pending' ? 'advertised' : 'advertise-pending';
        
        try {
            const response = await axiosSecure.patch(`/advertisement/admin/${id}`, { status: newStatus });
            if (response.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Advertisement status updated successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error occurred while updating the status",
                showConfirmButton: false,
                timer: 1500,
            });
        } finally {
            setLoadingState(prevState => ({ ...prevState, [id]: false }));
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Alhamdulilah advertisement: {advertisement.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Seller Email</th>
                            <th>Medicine Image</th>
                            <th>Medicine Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {advertisement.map((advertise, index) => (
                            <tr key={advertise._id}>
                                <td>{index + 1}</td>
                                <td>{advertise.userEmail}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={advertise.image} alt="Medicine" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{advertise.name}</td>
                                <td>{advertise.description}</td>
                                <td>{advertise.status}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleToggleStatus(advertise._id, advertise.status)}
                                        disabled={loadingState[advertise._id] || false}
                                    >
                                        {advertise.status === 'advertise-pending' ? 'Add' : 'Remove'}
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

export default AdminAdvertisement;
