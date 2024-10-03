import React from "react";

const FoodHero = ({ foodMainType }) => {
    return (
        <section
            className="relative bg-[url('https://images.unsplash.com/photo-1498588747262-0f2241707d13?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat w-[90%] h-96 rounded-lg mx-auto"
        >
            {/* Ocean Blue Transparent Cover */}
            <div className="absolute inset-0 bg-gray-950/80 rounded-lg"></div>

            {/* Content Section */}
            <div className="relative px-4 py-16 sm:px-6 lg:flex flex-row justify-between items-center lg:h-96 lg:items-center lg:px-8">
                <div className="max-w-xl text-center sm:text-left">
                    <div className=" flex justify-between items-start flex-col gap-2 text-white">
                        <span className=" text-xs">The foods that you love!</span>
                        <span className=" text-4xl font-semibold">{foodMainType?.name}</span>
                        <span className=" text-center px-2 py-2 rounded-full border border-white text-xs mt-4">Deliver in 20-25 mintutes </span>
                    </div>
                </div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1672099260380-4ba66eead8ed?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="img"
                        className=" w-72 rounded-lg mr-12"
                    />
                </div>
            </div>
        </section>
    );
};

export default FoodHero;
