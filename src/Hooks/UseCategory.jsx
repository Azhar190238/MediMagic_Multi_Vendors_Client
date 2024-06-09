import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const UseCategory = () => {
    const axiosPublic = UseAxiosPublic();
    const {data: categories = [], isPending: loading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async() =>{
       const res =await axiosPublic.get('/categories');
       return res.data;
        }
    })
    return [categories, loading, refetch]
};


export default UseCategory;