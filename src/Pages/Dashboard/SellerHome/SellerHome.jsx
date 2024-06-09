
// import UseAuth from "../../../Hooks/UseAuth";


// const SellerHome = () => {
//     const { user } = UseAuth();
//     return (
//         <div>
//                  <h2>
//             <span>Hi , WelCome seller Mr.  </span>
//             {
//               user?.displayName ? user.displayName: 'back'
//             }
//             </h2>
//         </div>
//     );
// };

// export default SellerHome;



import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxios from "../../../Hooks/UseAxios";

const SellerHome = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxios();

    // Fetch payments data using react-query
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });
  
    // Calculate totals based on payment status
    const totalPaid = payments.reduce((sum, payment) => {
        return payment.status === 'paid' ? sum + payment.price : sum;
    }, 0);

    const totalPending = payments.reduce((sum, payment) => {
        return payment.status === 'pending' ? sum + payment.price : sum;
    }, 0);

    const totalRevenue = totalPaid + totalPending;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
                <span>Hi, Welcome owner of the medicine shop </span>
                {user?.displayName ? user.displayName : 'back'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Total Revenue</h3>
                    <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Total Paid</h3>
                    <p className="text-2xl">${totalPaid.toFixed(2)}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Total Pending</h3>
                    <p className="text-2xl">${totalPending.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default SellerHome;
