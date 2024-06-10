import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const axiosPublic = axios.create({
    baseURL: 'https://assignment-12-server-seven-ecru.vercel.app'
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;