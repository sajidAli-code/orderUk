import React from 'react';

const StatsBanner = () => {
    return (
        <div className="bg-orange-500 rounded-lg py-6 w-[90%] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center text-white text-center">
                <div className="px-4">
                    <h2 className="text-4xl font-bold">546+</h2>
                    <p className="text-sm mt-2">Registered Riders</p>
                </div>
                <div className="hidden md:block border-r border-white h-10"></div>
                <div className="px-4">
                    <h2 className="text-4xl font-bold">789,900+</h2>
                    <p className="text-sm mt-2">Orders Delivered</p>
                </div>
                <div className="hidden md:block border-r border-white h-10"></div>
                <div className="px-4">
                    <h2 className="text-4xl font-bold">690+</h2>
                    <p className="text-sm mt-2">Restaurants Partnered</p>
                </div>
                <div className="hidden md:block border-r border-white h-10"></div>
                <div className="px-4">
                    <h2 className="text-4xl font-bold">17,457+</h2>
                    <p className="text-sm mt-2">Food Items</p>
                </div>
            </div>
        </div>
    );
};

export default StatsBanner;
