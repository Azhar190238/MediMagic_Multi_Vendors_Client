
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from "sweetalert2";
import { authContext } from "../Providers/AuthProvider";
import UseTitle from "../Components/Title/UseTitle";

const Login = () => {
    // Set the title of the page
    UseTitle("Login");

    // Initialize necessary hooks and context
    const area = useLocation();
    const naviGate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, googleSignIn, gitHubSignIn } = useContext(authContext)

    // Function to handle form submission for regular login
    const handleSignIn = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        try {
            // Attempt to sign in
            await signIn(email, password);
            naviGate(area?.state ? area.state : '/');
            Swal.fire({
                icon: 'success',
                title: 'Login successful!',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
         
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: 'Please check your credentials and try again.'
            });
        }
    }

    // Function to handle sign in with Google
    const handlesSignInWithGoogle = () => {
        googleSignIn()
            .then(result => {
                // console.log(result);
                naviGate(area?.state ? area.state : '/');
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: 'Please try again later.'
                });
            });
    }

    // Function to handle sign in with GitHub
    const handlesSignInWithGitHub = () => {
        gitHubSignIn()
            .then(result => {
                // console.log(result);
                naviGate(area?.state ? area.state : '/');
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: 'Please try again later.'
                });
            });
    }

    // JSX for the login form
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">


                <div className="hero-content flex-col lg:flex-row gap-10">
                    <div className="text-center lg:text-left w-1/2">

                        <img className="h-full rounded-2xl" src="https://i.postimg.cc/28h9hQsy/3094352.jpg" alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                        <form onSubmit={handleSignIn} className="card-body">
                            <h1 className="text-3xl font-bold text-center">Please Login!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="flex">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password" placeholder="Password" className="input border-slate-300 pr-16" required />
                                    <span onClick={() => setShowPassword(!showPassword)} className="mt-4 -ml-5">
                                        {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                                    </span>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forget password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <div>
                                <p className="text-center">Or</p>
                            </div>
                            <div className=" flex">
                                <p>
                                    <button onClick={handlesSignInWithGoogle} className="btn btn-outline ml-4 btn-success">Google</button>
                                </p>
                                <p>
                                    <button onClick={handlesSignInWithGitHub} className="btn btn-outline ml-4 btn-success">GitHub</button>
                                </p>
                            </div>
                            <div>
                                <p>Are You New ? So <Link to='/register'>
                                    <button className="btn btn-outline btn-success">Register</button>
                                </Link> </p>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Login;

