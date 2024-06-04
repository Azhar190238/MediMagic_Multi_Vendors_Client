import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxios from "./UseAxios";


const useSeller = () => {
    const {user, loading} = UseAuth();
    const axiosSecure = UseAxios();
const {data: isSeller , isPending: isSellerLoading} = useQuery({
    queryKey: [user?.email, 'isSeller'],
    enabled: !loading,
    queryFn: async()=>{
        const res= await axiosSecure.get(`/users/seller/${user.email}`);
        // console.log('Seller', res.data);
        return res.data?.seller;
    }
})
return [isSeller, isSellerLoading]
};

export default useSeller;