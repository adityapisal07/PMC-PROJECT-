import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';


function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-[var(--color-bg)] text-[var(--color-text)] shadow">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>

      </div>
      {/* <ThemeToggle /> */}
    </nav>
  );
}

export default Navbar;
