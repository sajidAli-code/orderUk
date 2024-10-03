import React, { useState } from 'react';
import OrderModal from './OrderModal';

const MenuCard = ({ foodItem }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="max-w-sm px-6 py-4 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-start flex-row gap-2">
                {/* Left Section - Text */}
                <div className=" w-1/2 flex flex-col justify-between gap-4">
                    <h3 className="text-sm font-semibold text-gray-950">{foodItem?.name}</h3>
                    <div className="mt-2 text-xs text-gray-600">
                        {foodItem?.introPara}
                    </div>
                    <p className="mt-4 text-sm font-bold text-gray-800">Price ${foodItem?.price}</p>
                </div>

                {/* Right Section - Image */}
                <div className=" w-1/2">
                    <div className="relative">
                        <img
                            src={foodItem?.imageSrc || '/images/burgerDeal1.png'}
                            alt={foodItem?.name}
                            className="rounded-md w-44 h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-end justify-end bg-black bg-opacity-25 rounded-md">
                            <button
                                onClick={openModal}
                                className="text-white text-center text-2xl pt-4 pl-4 font-bold bg-gray-800/50 hover:bg-gray-800/70 h-16 w-16 rounded-tl-full"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pass foodItem and modal control as props */}
            <OrderModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                foodItem={foodItem}
            />
        </div>
    );
};

export default MenuCard;
