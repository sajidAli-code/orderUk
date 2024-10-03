import React from 'react'
import MenuCard from './MenuCard'

const MenuCardContainer = ({ food }) => {
    return (
        <>
            <div className='w-[90%]'>
                <h2 className='text-xl font-bold px-4 py-6 capitalize'>
                    {food?._id}
                </h2>
                <div className=" px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 py-4">
                    {
                        food?.foods?.map((foodItem) => (
                            <MenuCard
                                key={foodItem?._id}
                                foodItem={foodItem}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default MenuCardContainer