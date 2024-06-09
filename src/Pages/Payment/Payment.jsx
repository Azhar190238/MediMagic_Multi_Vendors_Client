import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from  './CheckoutForm'
import SectionTitle from "../Shared/Section/SectionTitle";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_key);
const Payment = () => {
    return (
        <div className="mx-20 my-10">
            <SectionTitle
             heading='Payment'
             subHeading='Please pay to eat'
            ></SectionTitle>
            <div className="my-20">
                <Elements stripe={stripePromise}>
                 <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;