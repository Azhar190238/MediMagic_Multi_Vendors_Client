import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxios from "./UseAxios";


const useAdmin = () => {
    const {user, loading} = UseAuth();
    const axiosSecure = UseAxios();
const {data: isAdmin , isPending: isAdminLoading} = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    enabled: !loading,
    queryFn: async()=>{
        const res= await axiosSecure.get(`/users/admin/${user.email}`);
        // console.log('admin', res.data);
        return res.data?.admin;
    }
})
return [isAdmin, isAdminLoading]
};

export default useAdmin;