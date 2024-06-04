

// import { useContext} from 'react';

import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import SocialLogIn from "../../Components/SocialLogIn/SocialLogIn";

const SignUp = () => {
    const axiosPublic = UseAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updatedUserProfile } = useContext(AuthContext)
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updatedUserProfile(data.name, data.photoUrl)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: data.role
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added')
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Registration successfully done",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                        console.log("user profile info Updated")
                        reset();


                    })
                    .catch(error => console.log(error))

            })
    };


    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center lg:text-left w-1/2 h-full">
                        <img className="h-full rounded-2xl" src="https://i.postimg.cc/W30SgjyK/5500661.jpg" alt="" />
                    </div>
                        <div className="card shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">User Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} name="name" placeholder="User Name" className="input input-bordered" required />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" {...register("photoUrl", { required: true })} placeholder="Photo URl" className="input input-bordered" required />
                                    {errors.photoUrl && <span className="text-red-600">Photo Url is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" required />
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
                                    })} name="password" placeholder="Password" className="input input-bordered" required />
                                    {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                    {errors.password?.type === 'minLength' && <span className="text-red-600">Minimum 6 length required</span>}
                                    {errors.password?.type === 'maxLength' && <span className="text-red-600">Maximum 20 length required</span>}
                                    {errors.password?.type === 'pattern' && <span className="text-red-600">Password must include at least one uppercase letter, one lowercase letter, one number, and one special character</span>}
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
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

                                <div className="form-control mt-6">
                                    <button className="btn btn-primary" type="submit">SignUp Now</button>
                                </div>
                            </form>
                            <div className="my-2">
                            <SocialLogIn></SocialLogIn>
                            <p className="ml-10">Already Have A Account? <Link to='/login'>
                                <button className="btn btn-outline btn-success">Login</button>
                            </Link> </p>
                        </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;


