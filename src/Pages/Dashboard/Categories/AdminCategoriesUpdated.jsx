import Swal from "sweetalert2";
import SectionTitle from "../../Shared/Section/SectionTitle";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAxios from "../../../Hooks/UseAxios";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/UseAuth";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const image_hosting_key = import.meta.env.VITE_imageHosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AdminCategoriesUpdated = () => {
    const { user } = UseAuth();
    const { register, handleSubmit, reset } = useForm();
    const item = useLoaderData();
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxios();
    console.log("Item showing here ", item);
    const onSubmit = async (data) => {
        console.log(data);
        //image upload to imgbb then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        // now send the menu item to server wit include image url
        if (res.data.success) {
            const categoriesItem = {
                categoryName: data.categoryName,
                image: res.data.data.display_url,
                userEmail: user.email,
            }
            //  all item updated
            const menuRes = await axiosSecure.patch(`/categories/${item._id}`, categoriesItem)
            console.log(menuRes.data)
            if (menuRes.data.modifiedCount > 0) {
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Updated Successfully done`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            reset();
        }
    }
    return (
        <div>
              <Helmet>
                <title>MediMagic | Updated Category</title>
            </Helmet>
            <SectionTitle
                heading='Updated Here'
                subHeading="What's up Bro"></SectionTitle>
            <div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Image Upload</span>
                        </div>
                        <input {...register("image", { required: true })} type="file"  className="file-input w-full max-w-xs" />
                        
                    </label>
                    <label className="form-control w-full my-6 ">
                        <div className="label">
                            <span className="label-text">Category Name</span>
                        </div>
                        <input
                            {...register("categoryName", { required: true })}
                            type="text"
                            defaultValue={item.categoryName}
                            placeholder=" categoryName"
                            className="input input-bordered w-full " />

                    </label>

                    <button className="btn btn-secondary w-full"> Updated Items  </button>
                </form>
            </div>
        </div>
    );
};

export default AdminCategoriesUpdated;