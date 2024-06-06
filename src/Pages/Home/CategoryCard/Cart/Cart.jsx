


// import { Link } from "react-router-dom";
// import UseMedicineCart from "../../../../Hooks/UseMedicineCart";
// const Cart = ({ cart }) => {
//     const [carts] = UseMedicineCart();


//     // Calculate the total number of items in the cart for each category
//     const categoryCounts = carts.reduce((acc, item) => {
//         acc[item.category] = (acc[item.category] || 0) + 1;
//         return acc;
//     }, {});

//     return (
//         <div>
//             <div className="card w-96 bg-base-100 shadow-xl">
//                 <figure className="px-10 pt-10">
//                     <img className="rounded-xl" src={cart.image} />
//                 </figure>
//                 <h2 className="absolute right-0 bg-slate-800 text-white mr-16 mt-16 p-2 rounded-md">$ {cart.price}</h2>
//                 <div className="card-body items-center text-center">
//                     <h2 className="card-title text-2xl uppercase">{cart.category}</h2>
//                     <p className="text-lg">Number of categories : {categoryCounts[cart.category]}</p> {/* Display the count for the specific category */}
//                     <div className="card-actions">
//                        <Link to={`order/${cart.category}`}> <button  className="btn btn-outline border-0 border-orange-400 border-b-4"> Displaying All</button> </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Cart;



import { Link } from "react-router-dom";
import UseMedicineCart from "../../../../Hooks/UseMedicineCart";

const Cart = ({ cart }) => {
    const [carts] = UseMedicineCart();

    // Calculate the total number of items in the cart for each category
    const categoryCounts = carts.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});

    const { price, category, image } = cart;

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img className="rounded-xl" src={image} alt={`Image of ${category}`} />
                </figure>
                <h2 className="absolute right-0 bg-slate-800 text-white mr-16 mt-16 p-2 rounded-md">$ {price}</h2>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl uppercase">{category}</h2>
                    <p className="text-lg">Number of categories: {categoryCounts[category]}</p>
                    <div className="card-actions">
                        <Link to={`/order/${category}`}>
                            <button className="btn btn-outline border-0 border-orange-400 border-b-4">Displaying All</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

