
const SectionTitle = ({ heading, subHeading }) => {

    return (
        <div>
            <div className="md:w-4/12 mx-auto text-center my-8">
                <p className="text-xl text-[#D99904] mb-3">---{subHeading}---</p>
                <p className="text-3xl text-black border-y-4 py-5 uppercase">{heading}</p>
            </div>
  
        </div>
    );
};

export default SectionTitle;