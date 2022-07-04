import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const NavBar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">BB-Tek Headphones</Link>
      </p>

      {/* button to open the cart */}
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        {/* all items in the cart */}
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {/* only show the cart when showCart is set to true */}
      {showCart && <Cart />}
    </div>
  )
}

export default NavBar