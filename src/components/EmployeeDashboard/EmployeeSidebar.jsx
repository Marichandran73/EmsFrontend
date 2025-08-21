import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaTachometerAlt } from 'react-icons/fa';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { GiInterleavedArrows } from 'react-icons/gi';
import { IoSettings } from 'react-icons/io5';

import { useAuth } from '../../Context/AuthContext'; // ensure correct import

const EmployeeSidebar = () => {
  const { user } = useAuth();
 

  if (!user) {
    
    return (
       <div className="ml-[250px] mt-10 flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <span className="ml-4 text-gray-600 text-lg font-medium">
            Loading...
          </span>
        </div>
    );
  }

  const links = [
    { to: '/employee-dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: `/employee-dashboard/profile/${user._id}`, label: 'My Profile', icon: <FaUsers /> },
    { to: '/employee-dashboard/LeaveList', label: 'Leaves', icon: <GiInterleavedArrows /> },
    { to: `/employee-dashboard/EmpSalary/${user._id}`, label: 'Salary', icon: <CiMoneyCheck1 /> },
    { to: '/employee-dashboard/EmpSettings', label: 'Settings', icon: <IoSettings /> },
  ];

  return (
    <aside className="fixed top-[50px] left-0 h-[calc(100vh-50px)] w-60 bg-gray-700 text-white z-10">
      <nav className="flex flex-col gap-2 p-4">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-white text-gray-900 font-semibold'
                  : 'bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span className="text-base">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default EmployeeSidebar;
