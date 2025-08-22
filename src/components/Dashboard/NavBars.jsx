import React from 'react';
import { useAuth } from '../../context/AuthContext';

const NavBars = () => {
  const { logout, user } = useAuth();

  return (
    <nav className="bg-blue-800 fixed w-full h-16 top-0 left-0 text-white px-4 sm:px-6 lg:px-10 flex justify-between items-center shadow-md z-50">
      {/* Left: Welcome text */}
      <div className="text-base sm:text-lg md:text-xl font-bold tracking-wide truncate max-w-[60%]">
        Welcome {user?.name || 'User'}
      </div>

      {/* Right: Logout button */}
      <div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm sm:text-base transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBars;
