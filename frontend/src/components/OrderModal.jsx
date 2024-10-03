import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';

const OrderModal = ({ isOpen, closeModal, foodItem }) => {
    const [quantity, setQuantity] = useState(1);
    const price = foodItem?.price;  // Use default price if none is provided
    const total = price * quantity;

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const { cart, dispatch } = useContext(Context);

    const addToCart = () => {
        const product = {
            id: foodItem?._id,
            name: foodItem?.name,
            price: foodItem?.price,
            details: foodItem?.introPara
        }
        dispatch({
            type: 'ADD_TO_CART',
            payload: { product, quantity: quantity }
        });
        closeModal()
    };

    useEffect(() => {
        setQuantity(1);
    }, [])


    return (
        <>
            {isOpen && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box w-full">
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">{foodItem?.name}</span>
                                <button className="text-xl" onClick={closeModal}>X</button>
                            </div>
                            <p className="text-sm font-normal">{foodItem?.introPara}</p>
                            <div className="mt-6 flex flex-col gap-4">
                                <div className="flex justify-between items-center text-base font-semibold">
                                    <span>Price:</span>
                                    <span>${price}</span>
                                </div>
                                <div className="flex justify-between items-center text-base font-semibold">
                                    <span>Quantity:</span>
                                    <div className="flex items-center gap-2">
                                        <button className="btn btn-outline btn-warning btn-sm" onClick={handleDecrease}>-</button>
                                        <input
                                            type="number"
                                            className="input input-bordered input-sm w-16 text-center"
                                            value={quantity}
                                            readOnly
                                        />
                                        <button className="btn btn-outline btn-success btn-sm" onClick={handleIncrease}>+</button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-base font-semibold">
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button
                                className="btn btn-success btn-outline"
                                onClick={addToCart}
                            >Add to cart!</button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};

export default OrderModal;
