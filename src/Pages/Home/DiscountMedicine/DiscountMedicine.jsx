
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import UseMedicineCart from "../../../Hooks/UseMedicineCart";
import DiscountCart from './DiscountCart/DiscountCart';
import SectionTitle from '../../Shared/Section/SectionTitle';
import 'swiper/css';
import 'swiper/css/pagination';

// Initialize Swiper core modules
// SwiperCore.use([Pagination]);

const DiscountMedicine = () => {
    const [carts] = UseMedicineCart();

    // Filter the carts to only include those with a discount price greater than 0
    const discountCarts = carts.filter(cart => cart.disCountPrice > 0);

    return (
        <div>
            <SectionTitle subHeading="How nice!!" heading="Discount Medicine" />

            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {discountCarts.map(cart => (
                    <SwiperSlide key={cart._id}>
                        <DiscountCart cart={cart} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default DiscountMedicine;






