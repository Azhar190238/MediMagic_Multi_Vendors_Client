
import { Helmet } from 'react-helmet-async';
import CoverAll from '../Shared/Cover/CoverAll';
import menuImg from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import UseMenu from '../../Hooks/UseMedicineCart';
import MenuCategory from './MenuCategory/MenuCategory';
import SectionTitle from '../Shared/Section/SectionTitle';

const Menu = () => {
    const [menu] = UseMenu();
    const dessert = menu.filter(item => item.category === 'dessert')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup = menu.filter(item => item.category === 'soup')
    const offered = menu.filter(item => item.category === 'offered')
    return (
        <div className='my-10'>

            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <CoverAll img={menuImg}
                title='our menu'></CoverAll>
            <SectionTitle
                subHeading="Don't miss"
                heading="TODAY'S OFFER"
            ></SectionTitle>

            {/* for offered */}
            <MenuCategory items={offered}></MenuCategory>
            {/* for dessert */}
            <MenuCategory
                items={dessert}
                title="desserts"
                coverImg={dessertImg}
            ></MenuCategory>
            {/* for pizza */}
            <MenuCategory
                items={pizza}
                title="pizza"
                coverImg={pizzaImg}
            ></MenuCategory>
            {/* for salad */}
            <MenuCategory
                items={salad}
                title="salads"
                coverImg={saladImg}
            ></MenuCategory>
            {/* for soup */}
            <MenuCategory
                items={soup}
                title="soups"
                coverImg={soupImg}
            ></MenuCategory>





        </div>
    );
};

export default Menu;