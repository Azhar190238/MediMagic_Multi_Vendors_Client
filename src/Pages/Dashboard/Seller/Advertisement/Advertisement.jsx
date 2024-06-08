import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import UseAxios from "../../../../Hooks/UseAxios";
import SectionTitle from "../../../Shared/Section/SectionTitle";
import UseAdvertisementCart from "../../../../Hooks/UseAdvertisementCart";
const image_hosting_key = import.meta.env.VITE_imageHosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
console.log('Image Hosting Key:', image_hosting_key);

const Advertisement = () => {
    const { user } = UseAuth();
    const [advertisement, setAdvertisement, refetch] = UseAdvertisementCart();
    const [userAdvertise, setUserAdvertise] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxios();
    useEffect(() => {
        if (advertisement) {
            setUserAdvertise(advertisement.filter(cart => cart.userEmail === user.email));
        }
    }, [advertisement, user.email]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const onSubmit = async (data) => {
        const imageFile = new FormData();
        imageFile.append("image", data.image[0]);

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            const advertisementItem = {
                description: data.description,
                name: data.name,
                image: res.data.data.display_url,
                userEmail: user.email,
                status: 'advertise-pending', // Set default status here
            };

            const mediRes = await axiosSecure.post('/advertisement', advertisementItem);

            if (mediRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Advertisement added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
                handleCloseModal();
                const updatedCarts = await UseAdvertisementCart();
                setAdvertisement(updatedCarts[0]);
            }
        }
    };

    return (
        <div>
            <SectionTitle heading='Advertisement' subHeading="What's New Advertise"></SectionTitle>

            <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SERIAL</th>
                                <th>IMAGE</th>
                                <th>Short Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userAdvertise.map((item, index) => (
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
                                    <td>{item.description}</td>
                                    <td>{item.status}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            <div>
                <button className="btn flex items-center btn-primary" onClick={handleOpenModal}>
                    Add Advertisement
                </button>
                {isModalOpen && (
                    <dialog open className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex gap-6">
                                    <div className="w-1/2">
                                        <label className="form-control w-full my-6">
                                            <div className="label">
                                                <span className="label-text">Image Upload*</span>
                                            </div>
                                            <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                <label className="form-control w-full my-6">
                                            <div className="label">
                                                <span className="label-text">Item Name</span>
                                            </div>
                                            <input
                                                {...register("name", { required: true })}
                                                type="text"
                                                placeholder="Item Name here"
                                                className="input input-bordered w-full"
                                            />
                                        </label>
                                </div>
                                <label className="form-control mb-5">
                                    <div className="label">
                                        <span className="label-text">Description</span>
                                    </div>
                                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24" placeholder="Advertisement Details"></textarea>
                                </label>
                                <div className="flex justify-center w-full">
                                    <button className="btn btn-primary w-full">
                                        Add Advertisement
                                    </button>
                                </div>
                            </form>
                            <div className="modal-action">
                                <button className="btn" onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </dialog>
                )}
            </div>
        </div>
    );
};

export default Advertisement;

