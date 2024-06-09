import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import { axiosSecure } from "../../../Hooks/UseAxios";
import { axiosPublic } from "../../../Hooks/UseAxiosPublic";
import SectionTitle from "../../Shared/Section/SectionTitle";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_imageHosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AdminCategories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = UseAuth();

    const fetchCategories = async () => {
        const res = await axiosSecure.get('/categories');
        setCategories(res.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        reset();
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
            const categoriesItem = {
                categoryName: data.categoryName,
                image: res.data.data.display_url,
                userEmail: user.email,
            };

            const mediRes = await axiosSecure.post('/categories', categoriesItem);

            if (mediRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Category added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                fetchCategories();
                handleCloseModal();
            }
        }
    };

    const handleDeleteCategory = (categoryId) => {
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
                axiosSecure.delete(`/categories/${categoryId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Category has been deleted.",
                                icon: "success"
                            });
                            setCategories(categories.filter(category => category._id !== categoryId));
                        }
                    });
            }
        });
    };

    return (
        <div>
            <SectionTitle heading='Advertisement' subHeading="What's New Advertise" />

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>SERIAL</th>
                            <th>IMAGE</th>
                            <th>CATEGORY NAME</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt={item.categoryName} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.categoryName}</td>
                                <td>
                                    {/* */}
                                    <Link to={`/dashboard/updatedCategory/${item._id}`}> <button  className="btn btn-ghost bg-blue-500">
                                       Updated
                                    </button></Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteCategory(item._id)} className="btn btn-ghost bg-red-500">
                                        <FaTrashAlt className="text-xl text-white" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button className="btn flex items-center btn-primary" onClick={handleOpenModal}>
                    Add Category
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
                                            <input {...register("image", { required: "Image is required" })} type="file" className="file-input w-full max-w-xs" />
                                            {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="form-control w-full my-6">
                                        <div className="label">
                                            <span className="label-text">Category Name</span>
                                        </div>
                                        <input
                                            {...register("categoryName", { required: "Category name is required" })}
                                            type="text"
                                            placeholder="Category Name here"
                                            className="input input-bordered w-full"
                                        />
                                        {errors.categoryName && <span className="text-red-500">{errors.categoryName.message}</span>}
                                    </label>
                                </div>
                                <div className="flex justify-center w-full">
                                    <button className="btn btn-primary w-full">
                                        Add Category
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

export default AdminCategories;
