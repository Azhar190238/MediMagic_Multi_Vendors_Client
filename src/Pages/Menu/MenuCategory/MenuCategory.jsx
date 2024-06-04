
import { Link } from "react-router-dom";
import CoverAll from "../../Shared/Cover/CoverAll";
import MenuItems from "../../Shared/MenuItems/MenuItems";
const MenuCategory = ({items ,title ,coverImg}) => {
    return (
        <div className="my-12">
               {
                title && <CoverAll img={coverImg} title={title}></CoverAll>
               } 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                {
                    items.map(item => <MenuItems
                        key={item._id}
                        item={item}>

                    </MenuItems>)
                }
            </div>
            <Link to={`/order/${title}`}>
            <div className="flex flex-col items-center mt-10">
                <button className="btn btn-outline border-0 border-b-4 text-2xl">ORDER YOUR FAVOURITE FOOD</button>
            </div></Link>
        </div>
    );
};

export default MenuCategory;