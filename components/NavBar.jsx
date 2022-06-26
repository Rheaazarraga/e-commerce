import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

const NavBar = () => {
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">BB-Tek Headphones</Link>
      </p>

      {/* button to open the cart */}
      <button type='button' className='cart-icon' onclick=''>
        <AiOutlineShopping />
        <span className='cart-item-qty'>1</span>
      </button>
    </div>
  )
}

export default NavBar