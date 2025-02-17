
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
// import UseAdvertisementCart from "../../../Hooks/UseAdvertisementCart";

// const Banner = () => {
//     const [advertisement] = UseAdvertisementCart();

//     // Filter advertisements to only include those with status 'advertised'
//     const advertisedAds = advertisement.filter(ad => ad.status === 'advertised');

//     return (
//         <div>
//             <Carousel showThumbs={false} autoPlay infiniteLoop>
//                 {advertisedAds.map((ad, index) => (
//                     <div key={ad._id} className="h-[600px] flex justify-center items-center rounded-xl overflow-hidden">
//                         <img src={ad.image} alt={`Advertisement ${index + 1}`} className="h-full object-cover"/>
//                     </div>
//                 ))}
//             </Carousel>
//         </div>
//     );
// };

// export default Banner;
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import UseAdvertisementCart from "../../../Hooks/UseAdvertisementCart";

const Banner = () => {
    const [advertisement] = UseAdvertisementCart();

    // Filter advertisements to only include those with status 'advertised'
    const advertisedAds = advertisement.filter(ad => ad.status === 'advertised');

    return (
        <div>
            <Carousel showThumbs={false} autoPlay infiniteLoop>
                {advertisedAds.map((ad, index) => (
                    <div key={ad._id} className="relative h-[600px] flex justify-center items-center rounded-xl overflow-hidden">
                        <img src={ad.image} alt={`Advertisement ${index + 1}`} className="h-full object-cover w-full"/>
                        <div className="absolute inset-0 md:mx-24 flex justify-center items-center text-blue-600 text-4xl">
                            {ad.description}
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;



