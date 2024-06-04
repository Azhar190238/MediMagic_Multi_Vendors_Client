import SectionTitle from "../../Shared/Section/SectionTitle";
import featured from '../../../assets/home/featured.jpg'
import './Featured.css';
const Featured = () => {
    return (
        <section className="background-img bg-fixed bg-[#151515]  pt-8">
            <SectionTitle
            subHeading='Check it out'
            heading='FROM OUR MENU'
           
            ></SectionTitle>
           <div className="md:flex justify-center items-center bg-opacity-45 bg-[#151515] pb-24 pt-12 px-36 space-x-8">
           <div className="">
              <img src={featured} alt="" />
            </div>
            <div className=" space-y-3 text-white bg-opacity-45">
                <h1>March 20, 2023</h1>
                <h1>WHERE CAN I GET SOME?</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
            <button className="btn btn-outline border-0 border-b-4">READ MORE</button>
            </div>
           </div>

        </section>
    );
};

export default Featured;