
const BusinessCardContainer = (params) => {
    return (
        <>
            <div className=' w-full'>
                <h2 className=' text-xl font-bold px-4 py-6'>
                    {params.heading}
                </h2>
                <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 py-4">
                    {params.card}
                    {params.card}
                </div>
            </div>
        </>
    )
}

export default BusinessCardContainer