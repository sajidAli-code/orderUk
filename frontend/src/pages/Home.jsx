import { useEffect, useState } from "react"
import BusinessCard from "../components/BusinessCard"
import BusinessCardContainer from "../components/BusinessCardContainer"
import CatCardContiner from "../components/CatCardContiner"
import FAQ from "../components/FAQ"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import ResturantContainer from "../components/ResturantContainer"
import StatsBanner from "../components/StatsBanner"
import axios from 'axios'
import CategoryLoader from "../components/CategoryLoader"

const Home = () => {

    const resturants = [
        { id: 1, name: 'McDonald’s London', imgSrc: 'mcDonald.png' },
        { id: 2, name: 'Papa Johns', imgSrc: 'papaJohns.png' },
        { id: 3, name: 'KFC West London', imgSrc: 'kfc.png' },
        { id: 4, name: 'Texas Chicken', imgSrc: 'texasChicken.png' },
        { id: 5, name: 'Burger King', imgSrc: 'burgerKing.png' },
        { id: 6, name: 'Shaurma 1', imgSrc: 'no1Shaurma.png' }
    ];

    const [foodCategories, setFoodCategories] = useState([]); // Initialize with an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3300/get_categories')
            .then((response) => {
                // Check if response.data is defined and an array
                if (response.data && Array.isArray(response.data)) {
                    setFoodCategories(response.data); // Populate the state
                } else {
                    throw new Error('Unexpected data format');
                }
                setLoading(false); // Stop loading when data is fetched
            })
            .catch((error) => {
                setError(error); // Handle error
                setLoading(false); // Stop loading even if there's an error
            });
    }, []);

    return (
        <>
            <div className=" flex items-center flex-col gap-6">
                <HeroSection />
                {
                    loading ? (
                        <CategoryLoader />
                    ) : (
                        <CatCardContiner
                            heading={"Order.uk Popular Categories"}
                            categories={foodCategories}
                        />
                    )
                }
                <ResturantContainer
                    heading={"Popular Resturants"}
                    resturants={resturants}
                />
                <BusinessCardContainer
                    heading={"Order.uk Business Offers"}
                    card={<BusinessCard />}
                />
            </div>
        </>
    )
}

export default Home