import SectionTitle from "../../Shared/Section/SectionTitle";


const ReaderQuestion = () => {
    return (
        
        <div className="bg-[#D4D4D4] rounded-2xl">
            <div className="pt-10">
            <SectionTitle
                subHeading="Opps! Q & A"
                heading='Asked Any Question'>
            </SectionTitle>
            </div>
            <div className="text-center mt-8 mb-10 space-y-4 p-8 ">
                <h2 className="text-3xl font-extrabold">Reader's Question</h2>
                <p className="text-text-body font-semibold">
                    Having a website is essential for establishing credibility, <br /> reaching a wider audience, and serving as a central hub for online marketing efforts. <br />It provides accessibility 24/7 and enhances customer trust and engagement.</p>
            </div>
            <div className="border-2 rounded-xl">
                <div className="flex flex-col lg:flex-row gap-5 p-8">
                    <div>
                        <img className="lg:h-full" src="images/11.png" alt="" />
                    </div>
                    <div>
                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3" checked="checked" />
                            <div className="collapse-title text-xl font-bold">
                            What is the purpose of Paracetamol?
                            </div>
                            <div className="collapse-content">
                                <p>
                                 Paracetamol is commonly used as a pain reliever and to reduce fever. It is effective for treating headaches, muscle pain, arthritis, backaches, toothaches, colds, and fevers.</p>
                            </div>
                            <div className="w-full h-[1px] bg-[#13131833]"></div>
                        </div>

                        <div className="collapse collapse-plus ">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-bold">
                            How does Ibuprofen work?
                            </div>
                            <div className="collapse-content">
                                <p>

                                Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) that works by reducing hormones that cause inflammation and pain in the body. It is commonly used to treat pain, inflammation, and fever associated with conditions such as arthritis, menstrual cramps, and minor injuries.
                                </p>
                            </div>
                            <div className="w-full h-[1px] bg-[#13131833]"></div>
                        </div>

                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-bold">
                            What is Amoxicillin used for?
                            </div>
                            <div className="collapse-content">
                                <p>
                                Amoxicillin is an antibiotic medication used to treat a wide range of bacterial infections, including bronchitis, ear infections, urinary tract infections, and strep throat. It works by stopping the growth of bacteria.
                                </p>
                            </div>
                            <div className="w-full h-[1px] bg-[#13131833]"></div>
                        </div>
                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-bold">
                            What are the side effects of Cetirizine?


                            </div>
                            <div className="collapse-content">
                                <p>
                                Common side effects of Cetirizine, an antihistamine medication, may include drowsiness, dry mouth, headache, dizziness, and fatigue. However, these side effects are usually mild and temporary.
                                </p>
                            </div>
                            <div className="w-full h-[1px] bg-[#13131833]"></div>
                        </div>
                        <div className="collapse collapse-plus ">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-bold">
                            How does Metformin help in managing diabetes?


                            </div>
                            <div className="collapse-content">
                                <p>
                                Metformin is an oral medication used to treat type 2 diabetes. It works by decreasing the amount of sugar produced by the liver and increasing the sensitivity of muscle cells to insulin, thereby helping to lower blood sugar levels and improve glucose control in the body. Additionally, Metformin may also reduce the absorption of sugar from the intestines and increase the uptake of glucose by cells.

                                </p>
                            </div>
                            <div className="w-full h-[1px] bg-[#13131833]"></div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReaderQuestion;