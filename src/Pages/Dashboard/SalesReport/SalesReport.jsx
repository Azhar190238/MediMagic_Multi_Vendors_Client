
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxios from '../../../Hooks/UseAxios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Helmet } from 'react-helmet-async';

const SalesReport = () => {
    const axiosSecure = UseAxios();

    // State for date range
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // tanstack query used for advantages to refetch function 
    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    // Filter payments based on date range
    const filteredPayments = useMemo(() => {
        if (!startDate || !endDate) return payments;
        return payments.filter(payment => {
            const paymentDate = new Date(payment.date);
            return paymentDate >= startDate && paymentDate <= endDate;
        });
    }, [payments, startDate, endDate]);

    // Generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Sales Report', 20, 10);
        doc.autoTable({
            head: [['Serial', 'Buyer Email', 'Total Price', 'Date', 'Transaction Id', 'Status']],
            body: filteredPayments.map((payment, index) => [
                index + 1,
                payment.email,
                payment.price,
                payment.date,
                payment.transactionId,
                payment.status
            ])
        });
        doc.save('sales_report.pdf');
    };

    return (
        <div>
          
          <Helmet>
                <title>MediMagic | SalesReport</title>
            </Helmet>

            {/* Date Range Picker */}
            <div className="flex space-x-4 mb-4">
                <div>
                    <label>Start Date:</label>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                </div>
                <div>
                    <label>End Date:</label>
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Buyer Email</th>
                            <th>Total Price</th>
                            <th>Date</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredPayments.map((payment, index) => (
                                <tr key={payment._id} className="bg-base-200">
                                    <th>{index + 1}</th>
                                    <td>{payment.email}</td>
                                    <td>{payment.price}</td>
                                    <td>{payment.date}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-center mt-10'>
                <button onClick={generatePDF} className="btn btn-primary mb-4">Download PDF</button>
            </div>
        </div>
    );
};

export default SalesReport;








{/*  */ }

