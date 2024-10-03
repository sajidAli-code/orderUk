import React from 'react';
import CartListItem from './CartListItem';

const CartDrawer = ({ drawerRef }) => {
    return (
        <>
            <div className="z-50 drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" ref={drawerRef} />
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className=' h-full w-96 flex flex-col gap-4 px-2 pt-4 bg-base-200 text-base-content'>
                        <h1 className=' text-gray-900 text-lg font-bold px-2'>Shopping Cart</h1>
                        <CartListItem />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
