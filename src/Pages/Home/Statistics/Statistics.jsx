import SectionTitle from "../../Shared/Section/SectionTitle";


const Statistics = () => {
    return (
        <div className="bg-[#F7F8F8] px-10 pb-10">

            <div className="pt-10">
                <SectionTitle
                    subHeading="Statistics"
                    heading='Knowing this fact'>
                </SectionTitle>
            </div>
            <div className="text-center py-8 space-y-4">
                <h2 className="text-3xl font-extrabold">Here's a breakdown of different types <br /> of Medicine  by percentage</h2>
                <p className="text-text-body">These percentages may vary slightly based on different sources and methodologies, <br /> but they provide a general overview of the distribution of medicine <br /> types within the medical community</p>
            </div>
            <div className="flex flex-col lg:flex-row justify-center gap-8 mt-14">
                <div className="text-center space-y-3">
                    <div className="radial-progress text-primary rotate-180" style={{ "--value": 22 }} role="progressbar"><span
                        className="rotate-180">22%</span></div>
                    <h3 className="text-blacked font-semibold">Paracetamol (Fever,Headache)</h3>
                    <p className="text-text-body">Widely used as a pain reliever and to reduce fever</p>
                </div>
                <div className="text-center space-y-3">
                    <div className="radial-progress text-green-500 rotate-180" style={{ "--value": 18 }} role="progressbar"> <span
                        className="rotate-180">18%</span></div>
                    <h3 className="text-blacked font-semibold">Ibuprofen(Arthritis, Menstrual Cramps)</h3>
                    <p className="text-text-body">Commonly used as an anti-inflammatory drug to treat pain and inflammation.</p>
                </div>
                <div className="text-center space-y-3">
                    <div className="radial-progress text-blue-700 rotate-180" style={{ "--value": 15 }} role="progressbar"><span
                        className="rotate-180">15%</span></div>
                    <h3 className="text-blacked font-semibold">Amoxicillin(Bronchitis, Ear Infections)</h3>
                    <p className="text-text-body">An antibiotic used to treat a variety of bacterial infections.</p>
                </div>
                <div className="text-center space-y-3">
                    <div className="radial-progress text-accent rotate-180" style={{ "--value": 12 }} role="progressbar"><span
                        className="rotate-180">12%</span></div>
                    <h3 className="text-blacked font-semibold">Cetirizine(Allergic Rhinitis, Hay Fever)</h3>
                    <p className="text-text-body"> An antihistamine used to relieve allergy symptoms.</p>
                </div>
                <div className="text-center space-y-3">
                    <div className="radial-progress text-accent rotate-180" style={{ "--value": 10 }} role="progressbar"><span
                        className="rotate-180">10%</span></div>
                    <h3 className="text-blacked font-semibold">Metformin(Type 2 Diabetes)</h3>
                    <p className="text-text-body">A medication used to control blood sugar levels in people with type 2 diabetes.

                    </p>
                </div>
            </div>


        </div>
    );
};

export default Statistics;