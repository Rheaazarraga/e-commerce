import React, { createContext, useContext, useState, UseEffect } from 'react';

// pop-up notification that appears when something is added to/ removed from the cart or finish an order
import { toast } from 'react-hot-toast';

// hook
const Context = createContext();

export const StateContext = ({ children }) => {
  
  // states to manage the cart and the items in it
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setcartItems] = useState();
}