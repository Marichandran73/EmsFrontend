import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaBuilding, FaTachometerAlt } from 'react-icons/fa';
import { CiMoneyCheck1 } from "react-icons/ci";
import { GiInterleavedArrows } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";

const links = [
  { to: '/admin-dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { to: '/admin-dashboard/EmployeeList', label: 'Employee', icon: <FaUsers /> },
  { to: '/admin-dashboard/departmentList', label: 'Department', icon: <FaBuilding /> },
  { to: '/leave', label: 'Leave', icon: <GiInterleavedArrows /> },
  { to: '/salary', label: 'Salary', icon: <CiMoneyCheck1 /> },
  { to: '/settings', label: 'Settings', icon: <IoSettings /> },
];

const AdminSidebar = () => {
  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 bg-gray-700 text-white shadow-lg z-10">
      <div className="p-5 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-center tracking-wide">MC Developer</h2>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            end // ensures exact matching for active
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

export default AdminSidebar;
