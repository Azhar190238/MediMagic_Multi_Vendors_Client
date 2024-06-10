import { Helmet } from "react-helmet-async";
import PaymentHistory from "../../PyamentHistory/PaymentHistory";

const PaymentSeller = () => {
    return (
        <div>
              <Helmet>
                <title>MediMagic | Payment History</title>
            </Helmet>
           <PaymentHistory></PaymentHistory>
        </div>
    );
};

export default PaymentSeller;