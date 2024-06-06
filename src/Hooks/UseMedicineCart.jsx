import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const UseMedicineCart = () => {
    const axiosPublic = UseAxiosPublic();
    const {data: carts = [], isPending: loading, refetch } = useQuery({
        queryKey: ['carts'],
        queryFn: async() =>{
       const res =await axiosPublic.get('/carts');
       return res.data;
        }
    })
    return [carts, loading, refetch]
};


export default UseMedicineCart;