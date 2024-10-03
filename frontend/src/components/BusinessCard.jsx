
const BusinessCard = () => {
    return (
        <>
            <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-[38rem]">
                <img
                    src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
                    alt="University of Southern California"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h6 className="z-10 text-xs text-orange-500">Sign up as business</h6>
                <h3 className="z-10 mt-1 text-3xl font-bold text-white">Partner with us</h3>
                <a
                    className=" mt-2 z-10 text-xs text-white font-medium text-center bg-orange-500 w-24 px-2 py-2 rounded-full"
                    href="#"
                >
                    Get Started
                </a>
            </article>
        </>
    )
}

export default BusinessCard