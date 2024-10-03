import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingCart } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import CartDrawer from './CartDrawer';

const Navbar = () => {
    const drawerRef = useRef(null);
    const [loggedIn, setLoggedIn] = useState(false)
    // Dummy cart items
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Classic Cheeseburger',
            price: 7.99,
            quantity: 2,
            image: '/images/bugerDeal1.png',
        },
        {
            id: 2,
            name: 'Margherita Pizza',
            price: 11.99,
            quantity: 1,
            image: '/images/bugerDeal1.png',
        },
        {
            id: 3,
            name: 'Spicy Chicken Wings',
            price: 5.49,
            quantity: 3,
            image: '/images/burgerDeal1.png',
        },
    ]);

    const handleOpenCart = () => {
        if (drawerRef.current) {
            drawerRef.current.click();  // Trigger the drawer checkbox to open the drawer
        }
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setLoggedIn(true)
        }
    }, [])


    return (
        <>
            <nav className="pt-5 flex flex-wrap items-center justify-between w-[90%]">
                <Link to="/">
                    <img src="/images/logo.png" alt="logo" className="w-28 px-4" />
                </Link>
                <ul className="flex flex-row justify-between items-center gap-3">
                    <Link to="/" className="text-sm text-white font-medium px-6 py-2 bg-orange-500 rounded-full">Home</Link>
                    <Link to="#" className="text-sm text-gray-900 font-medium px-6 py-2 border border-transparent hover:border-orange-500 hover:text-orange-500 rounded-full">Browse Menu</Link>
                    <Link to="#" className="text-sm text-gray-900 font-medium px-6 py-2 border border-transparent hover:border-orange-500 hover:text-orange-500 rounded-full">Restaurants</Link>
                    <Link to="#" className="text-sm text-gray-900 font-medium px-6 py-2 border border-transparent hover:border-orange-500 hover:text-orange-500 rounded-full">Track Order</Link>
                </ul>
                <ul className="flex flex-row justify-between items-center gap-4">
                    <button onClick={handleOpenCart} className="text-2xl font-bold text-gray-900 hover:text-orange-500">
                        <MdShoppingCart />
                    </button>
                    {
                        loggedIn ? (
                            <Link to="/profile" className="text-sm text-white font-medium px-6 py-2 bg-gray-900 rounded-full hover:bg-gray-700 cursor-pointer flex flex-row gap-2 items-center">
                                <span className="text-orange-500"><FaRegUserCircle /></span>
                                <span>User Account</span>
                            </Link>
                        ) : (
                            <Link to="/userAuth/register" className="text-sm text-white font-medium px-6 py-2 bg-gray-900 rounded-full hover:bg-gray-700 cursor-pointer flex flex-row gap-2 items-center">
                                <span className="text-orange-500"><FaRegUserCircle /></span>
                                <span>Login/SignUp</span>
                            </Link>
                        )
                    }
                </ul>
            </nav>

            {/* Cart Drawer */}
            <CartDrawer
                drawerRef={drawerRef}
                cartItems={cartItems}
                onRemoveItem={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
            />
        </>
    );
};

export default Navbar;