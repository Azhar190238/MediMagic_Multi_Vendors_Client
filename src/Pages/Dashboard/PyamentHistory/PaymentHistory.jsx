import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxios from "../../../Hooks/UseAxios";
import { Helmet } from "react-helmet-async";


const PaymentHistory = () => {

    const { user } = UseAuth();
    const axiosSecure = UseAxios();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;

        }
    })
    return (
        <div>
              <Helmet>
                <title>MediMagic | PaymentHistory</title>
            </Helmet>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment,index) =>  <tr key={payment._id} className="bg-base-200">
                            <th>{index+1}</th>
                            <td>{payment.email}</td>
                            <td>{payment.price}</td>
                            <td>{payment.date}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.status}</td>
                        </tr>)
                        }
                      

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;