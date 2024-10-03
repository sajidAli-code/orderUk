import { Link } from 'react-router-dom';
const CategoryCard = ({ category }) => {
    return (
        <>
            <Link
                to={`/food_category/${category?._id}`}
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-48 overflow-hidden cursor-pointer"
            >
                <div className="relative overflow-hidden text-gray-700 bg-white bg-clip-border h-28">
                    <img
                        src={`./images/${category.imgSrc}`}
                        alt="card-image"
                        className="object-cover w-full h-full" />
                </div>
                <div className="px-4 py-2 bg-gray-100">
                    <div className="flex items-center justify-between mb-1">
                        <p className="block text-sm antialiased font-semibold leading-relaxed text-gray-900">
                            {category.name}
                        </p>
                    </div>
                    <p className="block text-xs antialiased font-normal leading-normal text-orange-500 opacity-75">
                        24 Meals
                    </p>
                </div>
            </Link>
        </>
    )
}

export default CategoryCard