import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000'
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;