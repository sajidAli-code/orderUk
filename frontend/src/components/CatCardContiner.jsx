import CategoryCard from "./CategoryCard";

const CatCardContiner = ({ heading, categories }) => {
    return (
        <div className='w-full'>
            <h2 className='text-xl font-bold px-4 py-6'>
                {heading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 py-4">
                {categories?.map((category, index) => (
                    <CategoryCard
                        key={index}
                        category={category}
                    />
                ))}
            </div>
        </div>
    )
}

export default CatCardContiner;
