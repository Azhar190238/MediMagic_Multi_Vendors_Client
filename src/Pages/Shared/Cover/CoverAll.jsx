
import { Parallax } from 'react-parallax';
const CoverAll = ({img, title}) => {
    return (
        <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="the menu"
        strength={-200}
    >
          <div>
            <div className="hero rounded-xl ">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-white">
                    <div className="mx-32  px-32  my-32 bg-[#151515] bg-opacity-50 p-5 rounded-lg shadow-lg">
                        <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

                    </div>
                </div>
            </div>
        </div>
    </Parallax>

    );
};

export default CoverAll;