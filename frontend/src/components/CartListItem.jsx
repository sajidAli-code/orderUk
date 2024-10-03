import { useContext, useState } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';

const OrderList = () => {

    const { cart, dispatch } = useContext(Context);
    const navigate = useNavigate()

    const handleRemove = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
    };

    // Calculate total price
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    console.log(cart)

    const handleProceedCheckout = async () => {
        const token = localStorage.getItem('authToken');

        const stripe = await loadStripe("pk_test_51MrOz3DiYUf43Uidu2fCeKTQWuaeqbJLSxVZfKsJF9Icudd12xa6QuVTWl61PdAitTXaX063aWo2GdSyfT4tp6eq001JontVN5");

        if (token) {
            const body = {
                products: cart
            }
            const headers = {
                "Content-Type": "application/json"
            }
            const response = await fetch("http://localhost:3300/create-checkout-session", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            const session = await response.json();

            const result = stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.log(result.error);
            }
        } else {
            navigate('/userAuth/login')
        }
    }

    return (
        <div className=" h-full w-full">
            {/* Scrollable list */}
            <div className="h-96 overflow-y-auto p-4">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between p-4 border-b last:border-none"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-500 text-white rounded-full p-2 flex items-center justify-center">
                                {item.quantity}x
                            </div>
                            <div>
                                <div className="font-semibold text-lg">${(item?.price * item?.quantity).toFixed(2)}</div>
                                <div className="text-sm font-semibold">{item?.name}</div>
                                <div className="text-gray-500 text-sm">{item?.details}</div>
                            </div>
                        </div>
                        <button
                            className="bg-gray-300 rounded-full p-2 flex items-center justify-center"
                            onClick={() => handleRemove(item.id)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 text-gray-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Total Section */}
            <div className="p-4 border-t">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total:</span>
                    <span className="font-semibold text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500">Including all taxes</div>
                <button
                    className={`w-full mt-4 py-2 rounded-lg text-white ${totalPrice === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                        }`}
                    disabled={totalPrice === 0}
                    onClick={handleProceedCheckout}
                >
                    Proceed to Checkout
                </button>

            </div>
        </div >
    );
};

export default OrderList;
