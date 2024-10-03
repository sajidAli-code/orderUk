import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../context/Context';
import { jwtDecode } from "jwt-decode";

const PaymentSuccess = () => {
    const { dispatch } = useContext(Context);

    const location = useLocation();

    useEffect(() => {
        localStorage.removeItem('cart');
        dispatch({ type: 'CLEAR_CART' });
    }, []);

    useEffect(() => {
        const fetchSession = async () => {
            const urlParams = new URLSearchParams(location.search);
            const sessionId = urlParams.get('session_id');

            // Get JWT token from sessionStorage, localStorage, or cookies (wherever you're storing it)
            const token = localStorage.getItem('authToken');

            if (token && sessionId) {
                try {
                    // Decode the JWT token to extract the userId
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.id;

                    // Send sessionId and userId to the backend
                    const response = await fetch('http://localhost:3300/placeOrder', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            session_id: sessionId,
                            userId: userId
                        })
                    });

                    const order = await response.json();
                    console.log('Order created:', order);
                } catch (error) {
                    console.error("Error fetching session details:", error);
                }
            }
        };

        fetchSession();
    }, [location]);

    return (
        <div className="flex flex-col items-center h-screen w-full">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                <img src="/images/success_anim.gif" alt="lottie_img" />
                <h2 className="text-2xl font-bold text-green-600 mt-4">Payment Successful!</h2>
                <p className="text-gray-600 mt-2 text-center">
                    Thank you for your payment. Your transaction has been completed successfully.
                </p>
                <Link
                    to='/'
                    className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;