import React, { useEffect, useState } from 'react'
import FoodHero from '../components/FoodHero'
import MenuCardContainer from '../components/MenuCardContainer'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FoodCategory = () => {
  const { id } = useParams()

  const [foods, setFoods] = useState([]); // Initialize with an empty array
  const [foodMainType, setFoodMainType] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3300/get_foods_groups/${id}`)
      .then((response) => {
        // Check if response.data is defined and an array
        if (response.data && Array.isArray(response.data)) {
          setFoods(response.data); // Populate the state
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

  useEffect(() => {
    axios.get(`http://localhost:3300/get_categories_by_id/${id}`)
      .then((response) => {
        // Check if response.data is defined and an array
        if (response.data) {
          console.log(response.data)
          setFoodMainType(response.data); // Populate the state
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
      <FoodHero
        foodMainType={foodMainType}
      />
      {
        foods?.map((food, index) => (
          <MenuCardContainer
            key={index}
            food={food}
          />
        ))
      }
    </>
  )
}

export default FoodCategory