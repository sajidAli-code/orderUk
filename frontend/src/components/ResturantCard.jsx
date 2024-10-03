
const ResturantCard = ({ category }) => {
    return (
        <>
            <article className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-48 overflow-hidden cursor-pointer">
                <div className="relative overflow-hidden text-gray-700 bg-white bg-clip-border h-28">
                    <img
                        src={`./images/${category.imgSrc}`}
                        alt="card-image"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex justify-center w-full bg-orange-500">
                    <p className="block text-sm antialiased font-semibold leading-relaxed text-white p-1 text-center">
                        {category.name}
                    </p>
                </div>
            </article>

        </>
    )
}

export default ResturantCard