import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../../Shared/Section/SectionTitle";
import UseAuth from "../../../../Hooks/UseAuth";
import UseMedicineCart from "../../../../Hooks/UseMedicineCart";
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import UseAxios from "../../../../Hooks/UseAxios";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_imageHosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
console.log('Image Hosting Key:', image_hosting_key);

const ManageMedicine = () => {
    const { user } = UseAuth();
    const [carts, setCarts, refetch] = UseMedicineCart();
    const [userCarts, setUserCarts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxios();

    // Filter medicines by the logged-in user's email
    useEffect(() => {
        if (carts) {
            setUserCarts(carts.filter(cart => cart.userEmail === user.email));
        }
    }, [carts, user.email]);

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
            const medicineItem = {
                itemName: data.itemName,
                genericName: data.genericName,
                category: data.category,
                massUnit: data.massUnit,
                company: data.company,
                disCountPrice: data.disCountPrice ? parseFloat(data.disCountPrice) : 0,
                price: parseFloat(data.price),
                description: data.description,
                image: res.data.data.display_url,
                userEmail: user.email
            };

            const mediRes = await axiosSecure.post('/carts', medicineItem);

            if (mediRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Medicine added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
                handleCloseModal();
                // Refresh the list of medicines
                const updatedCarts = await UseMedicineCart();
                setCarts(updatedCarts[0]);
            }
        }
    };

    return (
        <div>
              <Helmet>
                <title>MediMagic | ManageMedicine</title>
            </Helmet>
            <SectionTitle heading='Manage Medicine' subHeading="What's New"></SectionTitle>
            <div>
                <h2>All Manage items length : {userCarts.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table">
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
                            </tr>
                        </thead>
                        <tbody>
                            {userCarts.map((item, index) => (
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="btn flex items-center btn-primary" onClick={handleOpenModal}>
                    Add Medicine
                </button>
                {isModalOpen && (
                    <dialog open className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <div></div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex gap-6">
                                    <div className="w-1/2">
                                        <label className="form-control w-full my-6">
                                            <div className="label">
                                                <span className="label-text">Item Name</span>
                                            </div>
                                            <input
                                                {...register("itemName", { required: true })}
                                                type="text"
                                                placeholder="Item Name here"
                                                className="input input-bordered w-full"
                                            />
                                        </label>
                                    </div>
                                    <div className="w-1/2">
                                        <label className="form-control w-full my-6">
                                            <div className="label">
                                                <span className="label-text">Item Generic Name*</span>
                                            </div>
                                            <input
                                                {...register("genericName", { required: true })}
                                                type="text"
                                                placeholder="Item Generic here"
                                                className="input input-bordered w-full"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-1/2">
                                        <label className="form-control my-6">
                                            <div className="label">
                                                <span className="label-text">Category*</span>
                                            </div>
                                            <select defaultValue='default' {...register('category', { required: true })} className="select select-primary w-full">
                                                <option disabled value='default'>Select a Category</option>
                                                <option value='tablet'>Tablet</option>
                                                <option value='capsule'>Capsule</option>
                                                <option value='injection'>Injection</option>
                                                <option value='drops'>Drops</option>
                                                <option value='syrups'>Syrups</option>
                                                <option value='ointment'>Ointment</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="w-1/2">
                                        <label className="form-control w-full my-6">
                                            <div className="label">
                                                <span className="label-text">Item Mass Unit</span>
                                            </div>
                                            <input
                                                {...register("massUnit", { required: true })}
                                                type="text"
                                                placeholder="Item Mass here"
                                                className="input input-bordered w-full"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-1/2">
                                        <label className="form-control my-6">
                                            <div className="label">
                                                <span className="label-text">Company*</span>
                                            </div>
                                            <select defaultValue='default' {...register('company', { required: true })} className="select select-primary w-full">
                                                <option disabled value='default'>Select a Company</option>
                                                <option value='pharmaCorp'>PharmaCorp</option>
                                                <option value='healthPlus'>HealthPlus</option>
                                                <option value='mediHealth'>MediHealth</option>
                                                <option value='allerGen'>AllerGen</option>
                                                <option value='digestWell'>DigestWell</option>
                                                <option value='painAway'>PainAway</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="w-1/2">
                                        <label className="form-control w-full my-6">
                                            <div className="label">
                                                <span className="label-text">Per Unit Price*</span>
                                            </div>
                                            <input
                                                {...register("price", { required: true })}
                                                type="number"
                                                placeholder="Price here"
                                                className="input input-bordered w-full"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-1/2">
                                        <label className="form-control w-full my-6">
                                            <div className="label">
                                                <span className="label-text">Image Upload*</span>
                                            </div>
                                            <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                                        </label>
                                    </div>
                                    <div className="w-1/2">
                                        <label className="form-control w-full my-6">
                                            <div className="label">
                                                <span className="label-text">Discount Price</span>
                                            </div>
                                            <input
                                                {...register("disCountPrice")}
                                                type="number"
                                                placeholder="Discount Price here"
                                                className="input input-bordered w-full"
                                                defaultValue={0}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <label className="form-control mb-5">
                                    <div className="label">
                                        <span className="label-text">Medicine Details</span>
                                    </div>
                                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24" placeholder="Medicine Details"></textarea>
                                </label>
                                <div className="flex justify-center w-full">
                                    <button className="btn btn-primary w-full">
                                        Add Medicine
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

export default ManageMedicine;
