// import { Link } from "react-router-dom";
// import SectionTitle from "../Shared/Section/SectionTitle";


// const InvoicePage = () => {
//     return (
//         <div>
//             {/* <SectionTitle heading='Wow finally !!'
//                 subHeading='Now Purchase it'>

//             </SectionTitle> */}
//             <div className="flex justify-center items-center ">
//                 <Link to='/' className="flex items-center">
//                     <div className="flex items-center align-center space-x-1 md:space-x-2">
//                         <img className="w-12" src="https://i.ibb.co/YdL3J1T/R.jpg" alt="" />
//                         <a className="text-md md:text-3xl">Medi<span className="text-red-500">M</span>agic</a>
//                     </div>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default InvoicePage;
// import React from 'react';


// import { Link } from 'react-router-dom';
// import UseAuth from '../../Hooks/UseAuth';
// import UseAxios from '../../Hooks/UseAxios';
// import { useQuery } from '@tanstack/react-query';

// const InvoicePage = () => {
//     const {user} = UseAuth();
//     const axiosSecure = UseAxios();

//     const { data: payments = [] } = useQuery({
//         queryKey: ['payments', user.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/payments/${user.email}`)
//             return res.data;

//         }
//     })
//     console.log('Payment',payments)
//     console.log('user', user)

//     return (
//         <div className="p-4">
//             <div className="flex justify-center items-center mb-6">
//                 <Link to='/' className="flex items-center">
//                     <div className="flex items-center align-center space-x-1 md:space-x-2">
//                         <img className="w-12" src="https://i.ibb.co/YdL3J1T/R.jpg" alt="Logo" />
//                         <span className="text-md md:text-3xl">Medi<span className="text-red-500">M</span>agic</span>
//                     </div>
//                 </Link>
//             </div>

//             <div id="invoice" className="bg-white p-6 rounded shadow-md">
//                 <h2 className="text-2xl font-bold mb-4">Invoice</h2>
//                 <div className="mb-4">
//                     <h3 className="text-xl font-semibold">User Information</h3>
//                     <p>Name: {user.displayName}</p>
//                     <p>Email: {user.email}</p>
                   
//                 </div>
//                 <div className="mb-4">
//                     <h3 className="text-xl font-semibold">Purchase Information</h3>

//                     <p>Product: {payment.transactionId}</p>
//                     <p>Price: {payment.price}</p>
//                     <p>Date: {payment.date}</p>
//                 </div>
//                 <div className="flex justify-end">
//                     <p className="text-xl font-semibold">Total: $99.99</p>
//                 </div>
//             </div>

//             <div className="flex justify-center mt-6">
//                 <button 
                   
//                     className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-200"
//                 >
//                      Download PDF
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default InvoicePage;



import { Link } from 'react-router-dom';
import UseAuth from '../../Hooks/UseAuth';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';

const InvoicePage = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxios();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    const latestPayment = payments.length > 0 ? payments[payments.length - 1] : null;

    return (
        <div className="p-4">
            <div className="flex justify-center items-center mb-6">
                <Link to='/' className="flex items-center">
                    <div className="flex items-center align-center space-x-1 md:space-x-2">
                        <img className="w-12" src="https://i.ibb.co/YdL3J1T/R.jpg" alt="Logo" />
                        <span className="text-md md:text-3xl">Medi<span className="text-red-500">M</span>agic</span>
                    </div>
                </Link>
            </div>

            <div id="invoice" className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Invoice</h2>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">User Information</h3>
                    <p>Name: {user.displayName}</p>
                    <p>Email: {user.email}</p>
                </div>
                {latestPayment ? (
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Purchase Information</h3>
                        <p>Transaction ID: {latestPayment.transactionId}</p>
                        <p>Price: ${latestPayment.price}</p>
                        <p>Date: {new Date(latestPayment.date).toLocaleDateString()}</p>
                    </div>
                ) : (
                    <p>No recent payment found.</p>
                )}
                <div className="flex justify-end">
                    <p className="text-xl font-semibold">Total: ${latestPayment ? latestPayment.price : '0.00'}</p>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-200"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default InvoicePage;

