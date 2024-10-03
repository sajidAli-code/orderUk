import FAQCard from './FAQCard'

const FAQ = () => {
    return (
        <>
            {/* <!-- Container --> */}
            <div className="bg-gray-100 shadow-lg rounded-lg p-20 w-[90%]">

                <div className=' flex justify-between items-center flex-row gap-2 mb-10'>
                    <h1 className="text-2xl font-bold text-gray-900 text-center">Know more about us!</h1>
                    <ul className=' flex justify-between items-center gap-2 flex-row'>
                        <li className=' text-xs font-medium px-2 py-2 border border-orange-500 cursor-pointer rounded-full'>Frequent Questions</li>
                        <li className=' text-xs font-medium px-2 py-2 border border-transparent hover:border-orange-500 cursor-pointer rounded-full'>Who we are?</li>
                        <li className=' text-xs font-medium px-2 py-2 border border-transparent hover:border-orange-500 cursor-pointer rounded-full'>Partner Program</li>
                        <li className=' text-xs font-medium px-2 py-2 border border-transparent hover:border-orange-500 cursor-pointer rounded-full'>Help & Support</li>
                    </ul>
                </div>

                {/* <!-- Main Content Box --> */}
                <div className="bg-white p-12 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">

                        {/* <!-- FAQ Section --> */}
                        <div className="row-span-2">
                            <ul className='flex justify-between items-center gap-2 flex-col text-center'>
                                <li className=' text-xs font-semibold px-4 py-2 border border-transparent bg-orange-500 cursor-pointer rounded-full'>How does Order.UK work?</li>
                                <li className=' text-xs font-semibold px-4 py-2 border border-transparent hover:border-orange-500 cursor-pointer rounded-full'>What payment methods are accepted?</li>
                                <li className=' text-xs font-semibold px-4 py-2 border border-transparent hover:border-orange-500 cursor-pointer rounded-full'>Can I track my order in real-time?</li>
                                <li className=' text-xs font-semibold px-4 py-2 border border-transparent hover:border-orange-500 cursor-pointer rounded-full'>Are there any special discounts or promotions available?</li>
                                <li className=' text-xs font-semibold px-4 py-2 border border-transparent hover:border-orange-500 cursor-pointer rounded-full'>Is Order.UK available in my area?</li>
                            </ul>
                        </div>

                        {/* <!-- Information Cards --> */}
                        <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FAQCard
                                heading={'Place an Order!'}
                                imgSrc={'order_food_1.png'}
                                details={'Place order through our website'}
                            />
                            <FAQCard
                                heading={'Track Progress'}
                                imgSrc={'order_food_2.png'}
                                details={'You can track your order status with delivery time'}
                            />
                            <FAQCard
                                heading={'Get your Order!'}
                                imgSrc={'order_food_3.png'}
                                details={'Receive your order at lightning fast speed!'}
                            />
                        </div>

                        {/* Footer Text */}
                        <div className="col-span-2 mt-4 mx-6 text-center text-xs font-normal text-gray-600">
                            Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FAQ;
