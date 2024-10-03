
const FAQCard = ({heading, imgSrc, details}) => {
    return (
        <>
            <div className="bg-gray-100 p-8 shadow-md rounded-lg text-center">
                <h3 className=" text-sm font-bold mb-2">{heading}</h3>
                <img src={`/images/${imgSrc}`} alt="Place an Order" className="mx-auto mb-4 h-24" />
                <p className=" text-xs text-center text-gray-600">{details}</p>
            </div>
        </>
    )
}

export default FAQCard