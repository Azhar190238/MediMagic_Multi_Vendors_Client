import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";
import UseAuth from "./UseAuth";


const UseCart = () => {

    const axiosSecure =UseAxios();
    const {user} = UseAuth();
    const { refetch, data: cart = [] } = useQuery({
        // queryKey: ['cart'],
        queryKey: ['cart', user?.email],
        queryFn: async ()=>{
            // const res = await axiosSecure.get(`/carts`)
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            return res.data;
           
        }
       
    })
    console.log(' User email : ', user?.email);
    return [cart, refetch]
};

export default UseCart;