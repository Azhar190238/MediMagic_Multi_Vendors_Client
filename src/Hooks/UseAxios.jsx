import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const UseAxios = () => {

  const navigate = useNavigate();
   const {logOut} = UseAuth();
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token');
  //  console.log('Requested stopped by interceptors', token);
   config.headers.authorization = ` Bearer ${token}`;
   return config;
  }, function (error){
    return Promise.reject(error);
  });
  axiosSecure.interceptors.response.use(function (response){
    return response;
  }, async (error) =>{
    const status = error.response.status;
    // console.log('Status error in the intercept', status);
    if(status === 401 || status === 403){
      await logOut();
      navigate('/logIn')
    }
    return Promise.reject(error);
  })
  return axiosSecure;
};

export default UseAxios;