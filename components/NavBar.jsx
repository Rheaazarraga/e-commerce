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
      <button type='button' className='cart-icon' onclick=''>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      <Cart />
    </div>
  )
}

export default NavBar