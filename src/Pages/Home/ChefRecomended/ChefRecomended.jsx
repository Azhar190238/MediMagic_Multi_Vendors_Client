


import { useEffect, useState } from "react";
import SectionTitle from "../../Shared/Section/SectionTitle";
import RecommendCard from "./Recommend/RecommendCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ChefRecomended = () => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    const [recommends, setRecommends] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                const saladCategory = data.filter(item => item.category === 'salad');
                setRecommends(saladCategory);
            });
    }, []);

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const pages = chunkArray(recommends, 6);

    return (
        <section >
            <SectionTitle
                subHeading='Should Try'
                heading='CHEF RECOMMENDS'>
            </SectionTitle>
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={30}
                className="mySwiper "
            >
                {pages.map((page, pageIndex) => (
                    <SwiperSlide key={pageIndex}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {page.map(recommend => (
                                <RecommendCard key={recommend._id} recommend={recommend}></RecommendCard>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ChefRecomended;
