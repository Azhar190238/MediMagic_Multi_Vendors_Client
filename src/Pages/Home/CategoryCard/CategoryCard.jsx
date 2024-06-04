// import UseMedicineCart from "../../../Hooks/UseMedicineCart";
// import SectionTitle from "../../Shared/Section/SectionTitle";
// import Cart from "./Cart/Cart";

// const CategoryCard = () => {
//     const [carts] = UseMedicineCart();
//     console.log('Carts here', carts)
//     return (
//         <div>
//             <SectionTitle
//                 subHeading="That's need!!"
//                 heading='Category Medicine'>
//             </SectionTitle>
//             <div>
            
                    
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {carts.map(cart => (
//                                 <Cart key={cart._id} cart = {cart}></Cart>
//                             ))}
//                         </div>
                  
               
//             </div>
//         </div>
//     );
// };

// export default CategoryCard;


import UseMedicineCart from "../../../Hooks/UseMedicineCart";
import SectionTitle from "../../Shared/Section/SectionTitle";
import Cart from "./Cart/Cart";

const CategoryCard = () => {
    const [carts] = UseMedicineCart();

    // Get the latest item for each category
    const latestCarts = carts.reduce((latest, item) => {
        if (!latest[item.category] || latest[item.category].date < item.date) {
            latest[item.category] = item;
        }
        return latest;
    }, {});

    return (
        <div>
            <SectionTitle
                subHeading="That's need!!"
                heading='Category Medicine'>
            </SectionTitle>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.values(latestCarts).map(cart => (
                        <Cart key={cart._id} cart={cart}></Cart>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;
