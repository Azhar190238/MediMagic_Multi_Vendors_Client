
import { Link } from "react-router-dom";
import UseMedicineCart from "../../../../Hooks/UseMedicineCart";

const Cart = ({ cart }) => {
    const [carts] = UseMedicineCart();

    // Calculate the total number of items in the cart for each category
    const categoryCounts = carts.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});

    const { categoryName, image } = cart;

    // Get the count of items for the current category, defaulting to 0 if none exist
    const categoryCount = categoryCounts[categoryName] || 0;

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img className="rounded-xl" src={image} alt='image' />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl uppercase">{categoryName}</h2>
                    <p className="text-lg">Number of  Medicines: {categoryCount}</p>
                    <div className="card-actions">
                        <Link to={`/order/${categoryName}`}>
                            <button className="btn btn-outline border-0 border-orange-400 border-b-4">Displaying All</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;


