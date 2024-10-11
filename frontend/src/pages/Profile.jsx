import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const [orders, setOrders] = useState([])
    const [userDetails, setUserDetails] = useState({});

    const fetchOrders = async () => {

        // Get JWT token from sessionStorage, localStorage, or cookies (wherever you're storing it)
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                // Decode the JWT token to extract the userId
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                // Send sessionId and userId to the backend
                const response = await fetch(`http://localhost:3300/getOrder/${userId}`);

                const orders = await response.json();
                setOrders(orders)
            } catch (error) {
                console.error("Error fetching session details:", error);
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserDetails(decodedToken)
        }
        fetchOrders()
    }, [])
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            // Redirect to the home page
            navigate('/');

            // Remove session from localStorage or sessionStorage
            localStorage.removeItem('authToken'); // or sessionStorage.removeItem('authToken');

        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    var total = 0;
    return (
        <>
            <div className="grid grid-cols-3 grid-rows-1 gap-4 w-[90%] h-[100vh]">
                <div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 border border-gray-200">
                            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover" >
                                <img src='/images/gradientBg.jpg' className="absolute flex h-32 w-full justify-center rounded-xl bg-cover" />
                                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                                    <img className="h-full w-full rounded-full object-cover" src='/images/maleUser.jpg' alt="userImg" />
                                </div>
                            </div>
                            <div className="mt-16 flex flex-col items-center">
                                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                    {userDetails?.userName}
                                </h4>
                                <p className="text-base font-normal text-gray-600">{userDetails?.email}</p>
                            </div>
                            <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
                                    <p className="text-sm font-normal text-gray-600">All Orders</p>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-2xl font-bold text-navy-700 dark:text-white">
                                        12
                                    </p>
                                    <p className="text-sm font-normal text-gray-600">Delivered</p>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-2xl font-bold text-navy-700 dark:text-white">
                                        5
                                    </p>
                                    <p className="text-sm font-normal text-gray-600">Pending</p>
                                </div>
                            </div>
                            <button
                                className=' px-4 py-2 border border-orange-500 rounded-full mb-4 hover:bg-orange-500 hover:text-white'
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 h-full overflow-y-scroll w-full flex flex-col gap-2">
                    {
                        orders.length > 0 ? orders.map((order) => (
                            <div
                                key={order?._id}
                                className=" w-full border border-gray-300 rounded-lg max-w-3xl mx-auto"
                            >
                                {/* Top section */}
                                <div className="flex justify-between items-center mb-4 border-b border-gray-300 p-4">
                                    <div>
                                        <p className="text-gray-600 font-medium">Order Number</p>
                                        <p className="text-black font-bold uppercase">{order.orderNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 font-medium">Date placed</p>
                                        <p className="text-black font-bold">{new Date(order.createdAt).toISOString().split('T')[0]}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 font-medium">Total Amount</p>
                                        <p className="text-black font-bold">$
                                            {
                                                (order?.productList?.reduce((total, product) => {
                                                    return total + product?.amount_total / 100;
                                                }, 0) || 0).toFixed(2)
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <Link
                                            to={`/trackOrder/${order?._id}`}
                                            className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700"
                                        >
                                            Track Order
                                        </Link>
                                    </div>
                                </div>

                                {/* Product Info Section */}
                                <ul className=' py-2 px-4 flex flex-col gap-2'>
                                    {
                                        order?.productList.map((product) => (
                                            <li
                                                key={product?.id}
                                                className='border-b border-gray-300 py-2 last:border-none'
                                            >
                                                <div className="flex">
                                                    {/* Product Details */}
                                                    <div className="ml-6 flex-1 flex flex-row justify-between items-center">
                                                        <p className="font-bold text-lg">{product?.description}</p>
                                                        <span className=' flex flex-row justify-between items-center gap-2 font-medium text-gray-600'>
                                                            <p>{product?.quantity}</p>
                                                            <p>X</p>
                                                            <p>${product?.price?.unit_amount / 100}</p>
                                                            <p>=</p>
                                                            <p className=" font-bold text-gray-800">${(product?.price?.unit_amount / 100) * (product?.quantity)}</p>
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Bottom section */}
                                                <div className="flex justify-between items-center mt-4">
                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 text-green-500"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                        <p className="ml-2 text-gray-400 text-sm">
                                                            <span className=' font-semibold text-gray-500'>Delivery Status: </span>
                                                            {order?.orderStatus}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <button className="text-orange-500 text-sm font-semibold ml-4">Buy Again</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>

                        )) :
                            (
                                <div className=' flex justify-between items-center flex-col space-y-4 mt-16'>
                                    <p className=' text-2xl font-bold text-gray-400'>No orders placed!</p>
                                    <Link
                                        className=' px-4 py-2 border border-orange-500 rounded-full hover:bg-orange-500 hover:text-white'
                                        to="/"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            )
                    }
                </div>
            </div >

        </>
    )
}

export default Profile