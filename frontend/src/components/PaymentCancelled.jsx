import React from 'react';
import { Link } from 'react-router-dom'

const PaymentCancelled = () => {
    return (
        <div className="flex flex-col items-center h-screen w-full">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                <img src="/images/paymentCancelled.gif" alt="lottie_img" />
                <h2 className="text-2xl font-bold text-red-600 mt-4">Payment Cancelled!</h2>
                <p className="text-gray-600 mt-2 text-center">
                    Payment cancelled. The transaction was not completed, and no amount has been charged.
                </p>
                <Link
                    to='/'
                    className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancelled;