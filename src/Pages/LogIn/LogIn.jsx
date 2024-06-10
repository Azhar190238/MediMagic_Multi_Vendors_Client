// simple react capcha Searching then showing capcha

import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogIn from '../../Components/SocialLogIn/SocialLogIn';


const LogIn = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
   const from = location.state?.form?.pathname || '/'
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])
  const handleLogIn = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password)
    signIn(email, password)

      .then(result => {
        const user = result.user;
        // console.log(user)
        Swal.fire({
          title: "Log in successfuly done",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
        navigate(from , {replace:true});
      })
  }

  const handelSubmitCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    // console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value) == true) {
      setDisabled(false)
    }

    else {
      setDisabled(true)
    }
  }
  return (
    <>
      <Helmet>
        <title>MediMagic | Log In</title>
      </Helmet>
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col md:flex-row">
          <div className="text-center lg:text-left w-1/2">
            <img className="h-full rounded-2xl" src="https://i.postimg.cc/28h9hQsy/3094352.jpg" alt="Login Illustration" />
          </div>
            <div className="card shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleLogIn} className="card-body">
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
                  <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                  <input onBlur={handelSubmitCaptcha} type="text"  name="captcha" placeholder="Type here above captcha" className="input input-bordered" required />
                  
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" disabled={disabled} type="submit">LogIn Now</button>
                </div>
              </form>
              <div className='my-2'>
              <SocialLogIn />
              <p className='ml-10'>Are You New ? So <Link to='/signUp'>
                 <button className="btn btn-outline btn-success">Register</button>
                    </Link> </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;