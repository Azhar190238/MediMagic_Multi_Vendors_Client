
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../../Shared/Section/SectionTitle";
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import UseAxios from "../../../../Hooks/UseAxios";

const image_hosting_key = import.meta.env.VITE_imageHosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
console.log('Image Hosting Key:', image_hosting_key);

const AddMedicine = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxios();

    const onSubmit = async (data) => {
        try {
            // Upload image to imgbb
            const imageFile = new FormData();
            imageFile.append('image', data.image[0]);
            const res = await axiosPublic.post(image_hosting_api, imageFile);
            
            // Check if image upload was successful
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
                    image: res.data.data.display_url
                };
                
                // Add medicine item to the server
                const mediRes = await axiosSecure.post('/carts', medicineItem);
                
                // Check if item was added successfully
                if (mediRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Medicine added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error('Error adding medicine:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error adding medicine",
                text: error.message,
                showConfirmButton: true,
            });
        }
    };

    return (
        <div>
            <SectionTitle
                heading='Add A Medicine'
                subHeading="What's New"
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-6">
                    {/* Item Name */}
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
                    {/* Generic Name */}
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
                    {/* Category */}
                    <div className="w-1/2">
                        <label className="form-control my-6">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select defaultValue='default' {...register('category', { required: true })} className="select select-primary w-full">
                                <option disabled value='default'>Select a Category</option>
                                <option value='analgesic'>Analgesic</option>
                                <option value='anti-inflammatory'>Anti-inflammatory</option>
                                <option value='antibiotic'>Antibiotic</option>
                                <option value='antihistamine'>Antihistamine</option>
                                <option value='antacid'>Antacid</option>
                            </select>
                        </label>
                    </div>
                    {/* Mass Unit */}
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
                    {/* Company */}
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
                    {/* Price */}
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
                    {/* Image Upload */}
                    <div className="w-1/2">
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Image Upload*</span>
                            </div>
                            <input
                                {...register("image", { required: true })}
                                type="file"
                                className="file-input w-full max-w-xs"
                            />
                        </label>
                    </div>
                    {/* Discount Price */}
                    <div className="w-1/2">
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Discount Price*</span>
                            </div>
                            <input
                                {...register("disCountPrice", { required: true })}
                                type="number"
                                placeholder="Discount Price here"
                                className="input input-bordered w-full"
                                defaultValue={0}
                            />
                        </label>
                    </div>
                </div>
                {/* Description */}
                <label className="form-control mb-5">
                    <div className="label">
                        <span className="label-text">Medicine Details</span>
                    </div>
                    <textarea
                        {...register("description", { required: true })}
                        className="textarea textarea-bordered h-24"
                        placeholder="Medicine Details"
                    ></textarea>
                </label>
                <div className="flex justify-center w-full">
                    <button className="btn btn-primary w-full">
                        Add Medicine
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMedicine;
