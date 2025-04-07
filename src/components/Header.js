// components/Header.js
import React from 'react';
import "../styles.css"

 const Header = () => {
  return (
    <header className='Header'>
      <h1 className='Logo'>Chordify</h1>
          <a href="#home" className='nav'>Home</a>
          <a href="#explore" className='nav'>Explore</a>
          <a href="#about" className='nav'>About</a>
          </header>
  );
};
export default Header;
