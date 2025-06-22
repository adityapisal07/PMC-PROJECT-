import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu } from 'lucide-react';

function OuterNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 shadow backdrop-blur-md bg-opacity-70 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} px-6 py-3 flex justify-between items-center`}>
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-lg">NoteNode</Link>
        <button className="md:hidden" onClick={toggleMenu}>
          <Menu />
        </button>
        <div className={`flex-col md:flex md:flex-row gap-4 md:gap-6 ${showMenu ? 'flex' : 'hidden md:flex'}`}>
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/login" className="hover:text-blue-500">Login</Link>
          <Link to="/signup" className="hover:text-blue-500">Signup</Link>
        </div>
      </div>

      <button onClick={toggleTheme} className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-white'}`}>
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </nav>
  );
}

export default OuterNavbar;
