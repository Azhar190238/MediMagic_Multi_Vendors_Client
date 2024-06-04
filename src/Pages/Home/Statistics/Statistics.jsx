

const Statistics = () => {
    return (
        <div className="bg-[#F7F8F8] px-10 pb-10">
          
    {/* <div className="w-full h-[1px] bg-[#13131833]"></div> */}
    <div className="text-center py-8 space-y-4">
        <h2 className="text-3xl font-extrabold">Here's a breakdown of different types <br /> of blogs by percentage</h2>
        <p className="text-text-body">These percentages may vary slightly based on different sources and methodologies, <br /> but they provide a general overview of the distribution of blog <br /> types within the blogging community</p>
    </div>
    <div className="flex flex-col lg:flex-row justify-center gap-8 mt-14">
        <div className="text-center space-y-3">
            <div className="radial-progress text-primary rotate-180" style={{ "--value": 45 }} role="progressbar"><span
                className="rotate-180">45%</span></div>
            <h3 className="text-blacked font-semibold">Personal Blogs</h3>
            <p className="text-text-body">Around 45% of blogs are personal, focusing on the author's interests, experiences, and daily life.</p>
        </div>
        <div className="text-center space-y-3">
            <div className="radial-progress text-green-500 rotate-180" style={{ "--value": 15 }} role="progressbar"> <span
                className="rotate-180">15%</span></div>
            <h3 className="text-blacked font-semibold">Business/Professional Blogs</h3>
            <p className="text-text-body">Business or professional blogs make up about 15% of the blogosphere. These blogs focus on industry insights, tips, and news related to specific professions or sectors.</p>
        </div>
        <div className="text-center space-y-3">
            <div className="radial-progress text-blue-700 rotate-180" style={{ "--value": 20 }} role="progressbar"><span
                className="rotate-180">20%</span></div>
            <h3 className="text-blacked font-semibold">Technology Blogs</h3>
            <p className="text-text-body">Technology-related blogs account for roughly 20% of the blogging landscape, covering topics such as gadgets, software, programming, and IT trends.</p>
        </div>
        <div className="text-center space-y-3">
            <div className="radial-progress text-accent rotate-180" style={{ "--value": 15 }} role="progressbar"><span
                className="rotate-180">15%</span></div>
            <h3 className="text-blacked font-semibold">Food Blogs</h3>
            <p className="text-text-body"> Food blogs represent around 15% of all blogs, sharing recipes, cooking tips, restaurant reviews, and culinary experiences.</p>
        </div>
        <div className="text-center space-y-3">
            <div className="radial-progress text-accent rotate-180" style={{ "--value": 10 }} role="progressbar"><span
                className="rotate-180">10%</span></div>
            <h3 className="text-blacked font-semibold">Travel Blogs</h3>
            <p className="text-text-body">Travel blogs account for approximately 10% of the blogosphere, offering travel guides, destination reviews, and personal travel stories.

</p>
        </div>
    </div>


        </div>
    );
};

export default Statistics;