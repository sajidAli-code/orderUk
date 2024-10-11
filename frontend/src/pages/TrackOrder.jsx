import { useEffect, useState } from "react"
import MapContainer from "../components/MapContainer"
import { useParams } from "react-router-dom";

const TrackOrder = () => {

    const [order, setOrder] = useState();

    const { id } = useParams();

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3300/getOrderById/${id}`);

            // Check if the response is ok (status 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Parse the JSON from the response
            setOrder(data); // Set the order state with the fetched data
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [id])



    return (
        <>
            <MapContainer
                orderData={order}
            />
        </>
    )
}

export default TrackOrder