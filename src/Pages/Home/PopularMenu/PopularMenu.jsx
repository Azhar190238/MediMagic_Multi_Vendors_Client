// import { useEffect, useState } from "react";
import SectionTitle from "../../Shared/Section/SectionTitle";
import MenuItems from "../../Shared/MenuItems/MenuItems";
import UseMenu from "../../../Hooks/UseMedicineCart";


const PopularMenu = () => {
    const [menu] =UseMenu(); // using custom hook
    const popular =menu.filter(item => item.category === 'popular')
    // const [menu, setMenu] = useState([]);
    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category === 'popular');
    //             setMenu(popularItems)
    //         })
    // }, [])
    return (
        <section>
            <SectionTitle
                heading="FROM OUR MENU"
                subHeading='Check it out'
            ></SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {
                    popular.map(item => <MenuItems
                        key={item._id}
                        item={item}>

                    </MenuItems>)
                }
            </div>

            <div className="flex flex-col items-center mt-10">
                <button className="btn btn-outline border-0 border-b-4 text-2xl">View Full  Menu</button>
            </div>

        </section>
    );
};

export default PopularMenu;