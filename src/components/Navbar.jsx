import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(); // Trigger search on Enter key press
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the state of the menu
  };

  return (
    <div className="Navbar">
      {/* Logo */}
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation Links */}
      <ul className={menuOpen ? 'show' : ''}>
        <li>
          <Link to="/hotel" onClick={() => setMenuOpen(false)}>Hotels</Link>
        </li>
        <li>
          <Link to="/flights" onClick={() => setMenuOpen(false)}>Flights</Link>
        </li>
        <li>
          <input
            type="text"
            placeholder="Search for a destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            onKeyDown={handleKeyDown} // Trigger search on Enter key
            className="search-bar"
          />
        </li>
        <li>
          <Link to="/where-to-visit" onClick={() => setMenuOpen(false)}>Where to Visit</Link>
        </li>
        <li>
          <Link to="/car-rentals" onClick={() => setMenuOpen(false)}>Car Rentals</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
