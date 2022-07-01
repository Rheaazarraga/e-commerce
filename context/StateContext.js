import React, { createContext, useContext, useState, UseEffect } from "react";

// pop-up notification that appears when something is added to/ removed from the cart or finish an order
import { toast } from "react-hot-toast";

// ----- hook
const Context = createContext();

export const StateContext = ({ children }) => {
	// ----- states to manage the cart and the items in it
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState();

	// keep track of total price
	const [totalPrice, setTotalPrice] = useState();

	// what are the quantities of all the items
	const [totalQuantities, setTotalQuantities] = useState();

	// can change the quantity for each individual item
	const [qty, setQty] = useState(1);

	// ----- functions

  // if an item already exists in the cart
	const onAdd = (product, quantity) => {
    // get cartItems state, check if product we want to add is already in the cart
		const checkProductInCart = cartItems.find(item => item._id === product._id);

    // if it is, only increase the quantity, don't add another instance of the same item
		if (checkProductInCart) {
			setTotalPrice(
				prevTotalPrice => prevTotalPrice + product.price * quantity
			);
			setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);

    // update the items in the cart
			const updatedCartItems = cartItems.map(cartProduct => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity
					};
			});
			setCartItems(updatedCartItems);
			toast.success(`${qty} ${product.name} added to the cart.`);
		}
	};

	// increase quantity
	const incQty = () => {
		setQty(prevQty => prevQty + 1);
	};

	// decrease quantity, make sure quantity cannot go lower than 1
	const decQty = () => {
		setQty(prevQty => {
			prevQty;
			if (prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	};

	return (
		<Context.Provider
			// values to pass across the entire application
			value={{
				showCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty
			}}
		>
			{children}
		</Context.Provider>
	);
};

// special function to make it easier to grab the state
export const useStateContext = () => useContext(Context);
