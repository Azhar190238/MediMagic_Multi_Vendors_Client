
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import img1 from '../../../assets/home/slide1.jpg'
import img2 from '../../../assets/home/slide2.jpg'
import img3 from '../../../assets/home/slide3.jpg'
import img4 from '../../../assets/home/slide4.jpg'
import img5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../Shared/Section/SectionTitle';

// import required modules

const Category = () => {
    return (
      
       <section>
        <SectionTitle
          subHeading= {"From 11:00am to 10:00pm"}
          heading= {"ORDER ONLINE"} >
        </SectionTitle>
        <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src= {img1} alt="" />
            <h1 className='uppercase text-4xl -mt-24 text-white text-center '>Salads</h1>
            </SwiperSlide>
        <SwiperSlide><img src= {img2} alt="" />
        <h1 className='uppercase text-4xl -mt-24 text-white text-center '>Pizzas</h1>
        </SwiperSlide>
        <SwiperSlide><img src= {img3} alt="" />
        <h1 className='uppercase text-4xl -mt-24 text-white text-center '>Dezeerts</h1></SwiperSlide>
        <SwiperSlide><img src= {img4} alt="" />
        <h1 className='uppercase text-4xl -mt-24 text-white text-center '>Soups</h1></SwiperSlide>
        <SwiperSlide><img src= {img5} alt="" />
        <h1 className='uppercase text-4xl -mt-24 text-white text-center '>Salads</h1></SwiperSlide>
       
      </Swiper>
       </section>      
   
    
      
    );
};

export default Category;