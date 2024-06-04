import CoverAll from "../Shared/Cover/CoverAll";

import orderImg from '../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import UseMenu from "../../Hooks/UseMedicineCart";
import RecommendCard from "../Home/ChefRecomended/Recommend/RecommendCard";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Order = () => {
    const categories = ['salad', 'pizza','soups', 'desserts', 'drinks']
    const {category} =useParams();
    const initialIndex = categories.indexOf(category);

    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = UseMenu();

    const dessert = menu.filter(item => item.category === 'dessert')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup = menu.filter(item => item.category === 'soup')
    const drink = menu.filter(item => item.category === 'drinks')
    return (
        <div className="my-10 space-y-6">
              <Helmet>
                <title>Bistro Boss | Order</title>
            </Helmet>
            <CoverAll img={orderImg} title='OUR SHOP'></CoverAll>

            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className='uppercase'>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>soups</Tab>
                    <Tab>desserts</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-5">
                {
                    salad.map(recommend => <RecommendCard
                         key={recommend._id}
                         recommend={recommend}></RecommendCard>)
                }
            </div>
                </TabPanel>
                <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    pizza.map(recommend => <RecommendCard
                         key={recommend._id}
                         recommend={recommend}></RecommendCard>)
                }
            </div>
                </TabPanel>
                <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    soup.map(recommend => <RecommendCard
                         key={recommend._id}
                         recommend={recommend}></RecommendCard>)
                }
            </div>
                </TabPanel>
                <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    dessert.map(recommend => <RecommendCard
                         key={recommend._id}
                         recommend={recommend}></RecommendCard>)
                }
            </div>
                </TabPanel>
                <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    drink.map(recommend => <RecommendCard
                         key={recommend._id}
                         recommend={recommend}></RecommendCard>)
                }
            </div>
                </TabPanel>
               
            </Tabs>
        </div>
    );
};

export default Order;