import React from 'react';
import { useAuth } from '../../Context/AuthContext';

const NavBars = () => {
    const { logout, user } = useAuth();
  return (
    <nav className="bg-blue-800 fixed w-full h-16 top-0 left-0 text-white px-6 flex justify-between items-center shadow-md z-50">
      <div className="text-xl font-bold tracking-wide"> Welcome {user?.name || 'User'}</div>
      <div>
        <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition duration-200">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBars;
