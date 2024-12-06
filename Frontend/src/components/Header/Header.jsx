import React from 'react'
import './Header.css'
const Header = () => {

  const scrollToMenu = () => {
    document.getElementById('food-Display').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='header'>
        <div className="header-contents">
            <h2>order ur favourite Snack here</h2>
            <p>Enjoy a world of delicious snacks delivered straight to your door,anytime you crave.</p>
            <button onClick={scrollToMenu}> View Menu</button>
        </div>
    </div>
  )
}

export default Header