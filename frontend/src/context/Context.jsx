import React, { createContext, useReducer, useEffect } from 'react';

// Create the context
export const Context = createContext();

// Initial state for the cart
const initialState = [];

// Cart reducer to handle actions like add, remove, and update cart items
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const updatedCart = [...state];
            const itemIndex = updatedCart.findIndex(item => item.id === action.payload.product.id);

            if (itemIndex > -1) {
                // If the item is already in the cart, update its quantity
                updatedCart[itemIndex].quantity += action.payload.quantity;
            } else {
                // Otherwise, add a new item to the cart
                updatedCart.push({ ...action.payload.product, quantity: action.payload.quantity });
            }
            return updatedCart;

        case 'REMOVE_FROM_CART':
            return state.filter(item => item.id !== action.payload.id);

        case 'UPDATE_CART':
            return state.map(item =>
                item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
            );

        case 'CLEAR_CART':
            return [];

        case 'LOAD_CART_FROM_STORAGE':
            return action.payload;

        default:
            return state;
    }
};

// ContextProvider component
export const ContextProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on initial load
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        dispatch({ type: 'LOAD_CART_FROM_STORAGE', payload: storedCart });
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <Context.Provider
            value={
                {
                    cart,
                    dispatch
                }
            }
        >
            {children}
        </Context.Provider>
    );
};