
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import SocialLogIn from "../../Components/SocialLogIn/SocialLogIn";

const image_hosting_key = import.meta.env.VITE_imageHosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const axiosPublic = UseAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updatedUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // Upload image to imgbb
            const formData = new FormData();
            formData.append("image", data.image[0]);

            const imageRes = await fetch(image_hosting_api, {
                method: "POST",
                body: formData,
            });
            const imageResult = await imageRes.json();

            if (imageResult.success) {
                const imageUrl = imageResult.data.url;

                // Create user
                const result = await createUser(data.email, data.password);
                const loggedUser = result.user;

                // Update user profile with image URL
                await updatedUserProfile(data.name, imageUrl);

                // Save user info to the server
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    image: imageUrl,
                };
                const res = await axiosPublic.post("/users", userInfo);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Registration successfully done',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/");
                }
                reset();
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Registration failed",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>BMediMagic | Sign Up</title>
            </Helmet>
            <div>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col md:flex-row-reverse">
                        <div className="text-center lg:text-left w-1/2 h-full">
                            <img className="h-full rounded-2xl" src="https://i.postimg.cc/W30SgjyK/5500661.jpg" alt="SignUp" />
                        </div>
                        <div className="card shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">User Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} placeholder="User Name" className="input input-bordered" required />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" required />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
                                    })} placeholder="Password" className="input input-bordered" required />
                                    {errors.password && errors.password.type === 'required' && <span className="text-red-600">Password is required</span>}
                                    {errors.password && errors.password.type === 'minLength' && <span className="text-red-600">Minimum 6 characters required</span>}
                                    {errors.password && errors.password.type === 'maxLength' && <span className="text-red-600">Maximum 20 characters allowed</span>}
                                    {errors.password && errors.password.type === 'pattern' && <span className="text-red-600">Password must include at least one uppercase letter, one lowercase letter, one number, and one special character</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Role</span>
                                    </label>
                                    <select {...register("role", { required: true })} className="select select-bordered">
                                        <option value="user">User</option>
                                        <option value="seller">Seller</option>
                                    </select>
                                    {errors.role && <span className="text-red-600">Role is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Image Upload*</span>
                                    </label>
                                    <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                                    {errors.image && <span className="text-red-600">Image is required</span>}
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn btn-primary" type="submit">SignUp Now</button>
                                </div>
                            </form>
                            <div className="my-2">
                                <SocialLogIn />
                                <p className="ml-10">Already Have An Account? 
                                    <Link to='/login'>
                                        <button className="btn btn-outline btn-success">Login</button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
