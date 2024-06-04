

const ReaderQuestion = () => {
    return (
        <div className="bg-[#D4D4D4] rounded-2xl">
            <div className="text-center mt-16 mb-10 space-y-4 p-8 ">
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
                                What is Blog?
                            </div>
                            <div className="collapse-content">
                                <p>
                                    A blog is a website where people share their insights, experiences, or expertise on various topics through regularly updated posts.</p>
                            </div>
                            <div className="w-full h-[1px] bg-[#13131833]"></div>
                        </div>

                        <div className="collapse collapse-plus ">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-bold">
                                Definition of Blog Website?
                            </div>
                            <div className="collapse-content">
                                <p>

                                    A blog website is an online platform where individuals or organizations regularly publish articles, opinions, or multimedia content on specific topics of interest. It typically allows for reader engagement through comments and shares.
                                </p>
                            </div>
                            <div className="w-full h-[1px] bg-[#13131833]"></div>
                        </div>

                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-bold">
                                What is the purpose of a blog?
                            </div>
                            <div className="collapse-content">
                                <p>
                                    The purpose of a blog is to provide a platform for individuals or organizations to share their insights, expertise, experiences, or opinions on specific topics of interest. It serves as a means of communication, education, entertainment, or promotion, depending on the goals of the blogger.
                                </p>
                            </div>
                            <div className="w-full h-[1px] bg-[#13131833]"></div>
                        </div>
                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-bold">
                                How often should I update my blog?


                            </div>
                            <div className="collapse-content">
                                <p>
                                    Generally, consistency is key, aiming for at least one high-quality post per week to maintain reader interest and improve search engine visibility.
                                </p>
                            </div>
                            <div className="w-full h-[1px] bg-[#13131833]"></div>
                        </div>
                        <div className="collapse collapse-plus ">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-bold">
                                Can blogging help my business?


                            </div>
                            <div className="collapse-content">
                                <p>
                                    Yes, blogging can significantly benefit your business by increasing website traffic, enhancing brand visibility, establishing industry authority, and engaging with your target audience on a personal level.

                                </p>
                            </div>
                            <div className="w-full h-[1px] bg-[#13131833]"></div>
                        </div>
                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-bold">
                                How do I start a blog?
                            </div>
                            <div className="collapse-content">
                                <p>
                                    To start a blog, choose a niche/topic you are passionate about, select a blogging platform (like WordPress or Blogger), pick a domain name, set up hosting, design your blog, create compelling content, and promote it through social media and other channels to attract readers.
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