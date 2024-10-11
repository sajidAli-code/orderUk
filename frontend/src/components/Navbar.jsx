import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdShoppingCart } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import CartDrawer from './CartDrawer';
import { Context } from '../context/Context';

const Navbar = () => {
    const drawerRef = useRef(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation(); // Get current path
    // Dummy cart items
    const [cartItems, setCartItems] = useState([]);

    const { cart } = useContext(Context);

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
            setLoggedIn(true);
        }
    }, []);

    // Helper function to check if the link is active
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className="pt-5 flex flex-wrap items-center justify-between w-[90%]">
                <Link to="/">
                    <img src="/images/logo.png" alt="logo" className="w-28 px-4" />
                </Link>
                <ul className="flex flex-row justify-between items-center gap-3">
                    <Link
                        to="/"
                        className={`text-sm font-medium px-6 py-2 rounded-full ${isActive('/') ? 'text-white bg-orange-500' : 'text-gray-900 hover:border-orange-500 hover:text-orange-500 border-transparent'
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="#"
                        className={`text-sm font-medium px-6 py-2 rounded-full ${isActive('/browse-menu') ? 'text-white bg-orange-500' : 'text-gray-900 hover:border-orange-500 hover:text-orange-500 border-transparent'
                            }`}
                    >
                        Browse Menu
                    </Link>
                    <Link
                        to="#"
                        className={`text-sm font-medium px-6 py-2 rounded-full ${isActive('/restaurants') ? 'text-white bg-orange-500' : 'text-gray-900 hover:border-orange-500 hover:text-orange-500 border-transparent'
                            }`}
                    >
                        Restaurants
                    </Link>
                    <Link
                        to="/services"
                        className={`text-sm font-medium px-6 py-2 rounded-full ${isActive('/services') ? 'text-white bg-orange-500' : 'text-gray-900 hover:border-orange-500 hover:text-orange-500 border-transparent'
                            }`}
                    >
                        Services
                    </Link>
                </ul>
                <ul className="flex flex-row justify-between items-center gap-2 relative">
                    {loggedIn ? (
                        <Link
                            to="/profile"
                            className="text-sm text-white font-medium px-6 py-2 bg-gray-900 rounded-full hover:bg-gray-700 cursor-pointer flex flex-row gap-2 items-center"
                        >
                            <span className="text-orange-500"><FaRegUserCircle /></span>
                            <span>User Account</span>
                        </Link>
                    ) : (
                        <Link
                            to="/userAuth/register"
                            className="text-sm text-white font-medium px-6 py-2 bg-gray-900 rounded-full hover:bg-gray-700 cursor-pointer flex flex-row gap-2 items-center"
                        >
                            <span className="text-orange-500"><FaRegUserCircle /></span>
                            <span>Login/SignUp</span>
                        </Link>
                    )}
                    <button onClick={handleOpenCart} className="text-2xl font-bold text-gray-900 hover:text-orange-500 relative">
                        <MdShoppingCart />
                        {cart.length > 0 && (
                            <span className="absolute -top-3 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </button>
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