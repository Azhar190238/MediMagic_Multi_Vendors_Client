import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const UseAdvertisementCart = () => {
    const axiosPublic = UseAxiosPublic();
    const {data: advertisement = [], isPending: loading, refetch } = useQuery({
        queryKey: ['advertisement'],
        queryFn: async() =>{
       const res =await axiosPublic.get('/advertisement');
       return res.data;
        }
    })
    return [advertisement, loading, refetch]
};


export default UseAdvertisementCart;