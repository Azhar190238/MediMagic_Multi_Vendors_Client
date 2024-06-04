import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { authContext } from "../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";


const Register = () => {

    const navigate = useNavigate();
    const { createUser } = useContext(authContext);
    const [passwordError, setPasswordError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
        const photoUrl = form.get('photoUrl');
        setPasswordError('');
        console.log(name, photoUrl);

        // Regular expressions for special character and numeric character
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
        const hasNumericChar = /\d/.test(password);

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasValidLength = password.length >= 6;

        if (!hasUppercase || !hasLowercase || !hasValidLength || !hasSpecialChar || !hasNumericChar) {
            setPasswordError("Password must contain at least one uppercase letter, one lowercase letter, one special character, one numeric character, and have a minimum length of 6 characters.");
            return;
        }

        try {
            await createUser(email, password);

            Swal.fire({
                icon: 'success',
                title: 'Registration successful!',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/login');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: 'Please try again later.'
            });
        }
    }

    return (
        <div>
            <div>
                <Helmet>
                    <title> MediMagic | Home</title>
                </Helmet>
            </div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row gap-10">
                    <div className="text-center lg:text-left w-1/2 h-full">
                        <img className="h-full rounded-2xl" src="https://i.postimg.cc/W30SgjyK/5500661.jpg" alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            <h1 className="text-3xl font-bold text-center">Please Register Your Account</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Type here Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="url" name="photoUrl" placeholder="Photo's URL" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Type here Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="flex">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password" placeholder="Type here Password" className="input border-slate-300 pr-16" required />
                                    <span onClick={() => setShowPassword(!showPassword)} className="mt-4 -ml-5">
                                        {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                                    </span>
                                </div>
                                {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                            <div>
                                <p>Already Have A Account? <Link to='/login'>
                                    <button className="btn btn-outline btn-success">Login</button>
                                </Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
