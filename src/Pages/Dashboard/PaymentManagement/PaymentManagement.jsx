// import { useQuery } from "@tanstack/react-query";
// import UseAxios from "../../../Hooks/UseAxios";
// import Swal from "sweetalert2";

// const PaymentManagement = () => {
//     const axiosSecure = UseAxios();

//     // tanstack query used for advantages to refetch function 
//     const { data: payments = [], refetch } = useQuery({
//         queryKey: ['payments'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/payments');
//             return res.data;
//         }
//     });

//     const handelMakePaid = status =>{
//         axiosSecure.patch(`/payments/admin/${payment._id}`)
//         .then(res =>{
//             console.log(res.data);
//             if(res.data.modifiedCount >0){
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: `${payment.name} is now Paid`,
//                     showConfirmButton: false,
//                     timer: 1500
//                   });
//                   refetch();
//              }
//         })
//     }
//     return (
//         <div>
//                   <div>
//             <h2 className="text-4xl">Total Payments: {payments.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>Serial</th>
//                             <th>Email</th>
//                             {/* <th>Category</th> */}
//                             <th>Total Price</th>
//                             <th>Date</th>
//                             <th>Transaction Id</th>
//                             <th>Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             payments.map((payment,index) =>  <tr key={payment._id} className="bg-base-200">
//                             <th>{index+1}</th>
//                             <td>{payment.email}</td>
//                             <td>{payment.price}</td>
//                             <td>{payment.date}</td>
//                             <td>{payment.transactionId}</td>
//                             <td>{payment.status}</td>
                            
//                             {
//                                     payment.status === 'paid' ? 'paid':<button  onClick={() => handelMakePaid(status) }
//                                     className="btn bg-orange-500 "> 
//                                     Accept Payment
//                                     </button>
//                                    }
//                         </tr>)
//                         }
                      

//                     </tbody>
//                 </table>
//             </div>

//         </div>
//         </div>
//     );
// };

// export default PaymentManagement;



import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../Hooks/UseAxios";
import Swal from "sweetalert2";

const PaymentManagement = () => {
    const axiosSecure = UseAxios();

    // tanstack query used for advantages to refetch function 
    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    const handelMakePaid = payment => {
        axiosSecure.patch(`/payments/admin/${payment._id}`)
        .then(res => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${payment.name} is now Paid`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        });
    };

    return (
        <div>
            <h2 className="text-4xl">Total Payments: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Email</th>
                            {/* <th>Category</th> */}
                            <th>Total Price</th>
                            <th>Date</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => (
                                <tr key={payment._id} className="bg-base-200">
                                    <th>{index + 1}</th>
                                    <td>{payment.email}</td>
                                    <td>{payment.price}</td>
                                    <td>{payment.date}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.status}</td>
                                    <td>
                                        {payment.status === 'paid' ? 'paid' :
                                            <button onClick={() => handelMakePaid(payment)}
                                                    className="btn bg-orange-500">
                                                Accept Payment
                                            </button>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentManagement;
