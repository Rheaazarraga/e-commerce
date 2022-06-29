import React, { createContext, useContext, useState, UseEffect } from 'react';

// pop-up notification that appears when something is added to/ removed from the cart or finish an order
import { toast } from 'react-hot-toast';

// ----- hook
const Context = createContext();

export const StateContext = ({ children }) => {
  
  // ----- states to manage the cart and the items in it
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setcartItems] = useState();

  // keep track of total price
  const [totalPrice, settotalPrice] = useState();

  // what are the quantites of all the items
  const [totalQuantities, setTotalQuantities] = useState();

  // can change the quantity for each individual item
  const [qty, setQty] = useState(1);


  // ----- functions 

  // increase quantity
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  // decrease quantity, make sure quantity cannot go lower than 1
  const decQty = () => {
    setQty((prevQty) => { prevQty 
      if(prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  }

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
  )

}