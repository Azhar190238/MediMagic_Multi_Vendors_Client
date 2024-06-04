import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../Shared/Section/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_key);
const Payment = () => {
    return (
        <div>
            <SectionTitle
             heading='Payment'
             subHeading='Please pay to eat'
            ></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                 <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;