
import { Link } from 'react-router-dom';
import UseAuth from '../../Hooks/UseAuth';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

    const generatePDF = () => {
        const doc = new jsPDF();

        // Add logo/image
        const logoUrl = 'https://i.ibb.co/YdL3J1T/R.jpg';
        const logoImage = new Image();
        logoImage.src = logoUrl;
        logoImage.onload = () => {
            const imgWidth = 50;
            const imgHeight = 50;
            const pageWidth = doc.internal.pageSize.getWidth();
            const xOffset = (pageWidth - imgWidth) / 2;

            doc.addImage(logoImage, 'JPEG', xOffset, 10, imgWidth, imgHeight); // Center the logo at the top
            // doc.text('Invoice', 20, 70);

            doc.autoTable({
                head: [['User Information', '']],
                body: [
                    ['Name', user.displayName],
                    ['Email', user.email]
                ],
                startY: 80,
            });

            if (latestPayment) {
                doc.autoTable({
                    head: [['Purchase Information', '']],
                    body: [
                        ['Transaction ID', latestPayment.transactionId],
                        ['Price', `$${latestPayment.price}`],
                        ['Date', new Date(latestPayment.date).toLocaleDateString()]
                    ],
                    startY: doc.lastAutoTable.finalY + 10,
                });

                doc.text(`Total: $${latestPayment.price}`, 20, doc.lastAutoTable.finalY + 20);
            } else {
                doc.text('No recent payment found.', 20, doc.lastAutoTable.finalY + 10);
            }

            doc.save('invoice.pdf');
        };
    };

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

            <div id="invoice" className="bg-white p-6 rounded align-middle shadow-md">
            
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
                    onClick={generatePDF}
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-200"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default InvoicePage;
