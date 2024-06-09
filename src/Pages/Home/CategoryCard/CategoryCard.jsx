



import UseCategory from "../../../Hooks/UseCategory";
import SectionTitle from "../../Shared/Section/SectionTitle";
import Cart from "./Cart/Cart";

const CategoryCard = () => {
    const [categories] = UseCategory();

    return (
        <div>
            <SectionTitle
                subHeading="That's need!!"
                heading="Category Medicine"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(cart => (
                    <div key={cart._id} className="flex h-full">
                        <Cart cart={cart} className="w-full h-full" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCard;

