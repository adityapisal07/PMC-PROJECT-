import React from 'react';
import { Link, Outlet,useNavigate } from 'react-router-dom';
import { LogOut, Moon, Sun } from 'lucide-react';
import { useState,useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';



function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    const handlePopState = () => {
      window.history.pushState(null, null, window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userEmail");
      navigate('/', { replace: true });


    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className={darkMode ? 'bg-black text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-opacity-80 backdrop-blur-md shadow-md flex justify-between items-center px-6 py-3 z-50">
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-lg font-bold hover:text-blue-500">NoteNode</Link>
          <Link to="/notes" className="hover:text-blue-500">Notes</Link>
          <Link to="/groups" className="hover:text-blue-500">Groups</Link>
          <Link to="/discussions" className="hover:text-blue-500">Discussions</Link>
          <Link to="/assignments" className="hover:text-blue-500">Assignments</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/groups">Groups</Link>
          <Link to="/assignments">Assignments</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/aibox">AI Box</Link>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              darkMode ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-white'
            }`}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </nav>

      {/* Main content with compact padding so content is closer below navbar */}
      <div className="pt-14 sm:pt-16 px-4 max-w-7xl mx-auto">
        <Outlet context={{ darkMode }} />
      </div>
    </div>
  );
}

export default Layout;
