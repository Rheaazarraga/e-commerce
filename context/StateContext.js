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

		// state to increase the total price by setting the previous total price + the newly added products price and the quantity 
		setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
		// state to update the quantities in the cart
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    // if item already exists in the cart, only increase the quantity, don't add another instance of the same item
		if (checkProductInCart) {
    // update the items in the cart
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
					// update the cart quantity
						...cartProduct,
						quantity: cartProduct.quantity + quantity
					};
			});
			setCartItems(updatedCartItems);
		// if an item does NOT already exist in the cart
		} else {
			// update the product quantity
			product.quantity = quantity;
			// spread all existing cartItems, add an object to spread new product (product with updated quantity)
			setCartItems([...cartItems, { ...product }]);
		}
		toast.success(`${qty} ${product.name} added to the cart.`);
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
				decQty,
				onAdd
			}}
		>
			{children}
		</Context.Provider>
	);
};

// special function to make it easier to grab the state
export const useStateContext = () => useContext(Context);


// context is for passing down props all the way down to any of the children without having to manually pass props into each component
// works as a global state for all of the children of the Provider
// Context.Provider is used to wrap all of the code that needs access to the information in the Context
// it's single prop, value{}, is whatever the value of the context is
// everything inside the Provider (components and their children, etc) all have access to the variable in the value prop of the Provider
