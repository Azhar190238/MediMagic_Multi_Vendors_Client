import { useForm } from "react-hook-form";
import SectionTitle from "../../Shared/Section/SectionTitle";
import { useLoaderData } from "react-router-dom";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAxios from "../../../Hooks/UseAxios";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_imageHosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdatedItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const item = useLoaderData();
    console.log("Item", item);
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxios();
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
        if(res.data.success){
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            //  all item updated
            const menuRes = await axiosSecure.patch(`/menu/${item._id}`, menuItem)
            console.log(menuRes.data)
            if(menuRes.data.modifiedCount > 0){
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${item.name} updated Successfuly` ,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  
            }
        }     
        console.log('With image url',res.data)
    }
    return (
        <div>
           <SectionTitle
           heading='Updated Here'
           subHeading="What's up Bro"></SectionTitle>  
              <div>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6 ">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            defaultValue={item.name}
                            placeholder="Recipe Name"
                            className="input input-bordered w-full " />

                    </label>
                    <div className="flex gap-6">

                        {/* category part */}
                        <div className="w-1/2">
                            <label className="form-control my-6 ">
                                <div className="label">
                                    <span className="label-text">Category*</span>
                                </div>
                                <select defaultValue= {item.category}   {...register('category', { required: true })}  className="select select-primary w-full ">
                                    <option disabled value='default'>Select a Category</option>
                                    <option value='salad'>Salad</option>
                                    <option value='pizza'>Pizza</option>
                                    <option value='soup'>Soup</option>
                                    <option value='dessert'>Dessert</option>
                                    <option value='drinks'>Drinks</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-1/2">
                            <label className="form-control w-full my-6 ">
                                <div className="label">
                                    <span className="label-text">Price*</span>
                                </div>
                                <input
                                    {...register("price", { required: true })}
                                    defaultValue={item.price}
                                    type="number"
                                    placeholder="Price here"
                                    className="input input-bordered w-full " />

                            </label>
                        </div>

                    </div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea {...register("recipe", { required: true })} defaultValue={item.recipe} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

                    </label>
                    <div className="my-4">
                        <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn btn-secondary w-full"> Updated Items  </button>
                </form>
            </div>
     </div>
    );
};

export default UpdatedItems;