import HeroCard from "./HeroCard"

const HeroSection = () => {
    return (
        <>
            <div className="bg-gray-50 w-full rounded-lg">
                <div className=" mx-auto pl-4 overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        {/* <!-- Left Content Section --> */}
                        <div className="md:w-1/2 space-y-6 mx-6 py-12 z-50">
                            <p className=" text-sm font-medium text-gray-600">
                                Order Restaurant food, takeaway and groceries.
                            </p>
                            <h1 className="text-5xl font-semibold text-gray-900">
                                Feast Your Senses, <br /> <span className="text-orange-500">Fast and Fresh</span>
                            </h1>
                            <p className=" text-xs text-gray-600">
                                Enter a post code to see where we deliver
                            </p>
                            <div className="flex items-center my-6 relative w-96">
                                <input
                                    type="text"
                                    placeholder="e.g. EC4R 3TE"
                                    className="border border-gray-300 rounded-full py-2 px-4 w-full pr-16"
                                />
                                <button className="bg-orange-500 text-white py-2 px-12 rounded-full hover:bg-orange-600 absolute right-0 mr-1">
                                    Search
                                </button>
                            </div>

                        </div>

                        {/* <!-- Right Content Section with Image --> */}
                        <div className="relative w-1/2 h-full flex flex-row">
                            <img src="./images/heroImg.png" alt="Eating Pizza" className=" absolute w-full z-20 -ml-80" />
                            <img src="./images/hero2.png" alt="Eating Pizza" className=" w-56 rounded-t-lg z-10 ml-20 mt-20" />
                            <div className="absolute w-4/5 h-96 bg-orange-500 right-0 top-0 bottom-0 z-0 rounded-tl-[200px] rounded-r-lg"></div>

                            <div className=" absolute z-30 flex justify-between items-start flex-col gap-4 mt-10 right-20">
                                <div className=" -ml-16">
                                    <HeroCard />
                                </div>
                                <div className=" -ml-12">
                                    <HeroCard />
                                </div>
                                <div className=" -ml-16">
                                    <HeroCard />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection