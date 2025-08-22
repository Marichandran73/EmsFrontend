import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaBuilding, FaTachometerAlt } from 'react-icons/fa';
import { CiMoneyCheck1 } from "react-icons/ci";
import { GiInterleavedArrows } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const links = [
  { to: '/admin-dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { to: '/admin-dashboard/EmployeeList', label: 'Employees', icon: <FaUsers /> },
  { to: '/admin-dashboard/departmentList', label: 'Departments', icon: <FaBuilding /> },
  { to: '/admin-dashboard/leaves', label: 'Leaves', icon: <GiInterleavedArrows /> },
  { to: '/admin-dashboard/Add-Salary', label: 'Salary', icon: <CiMoneyCheck1 /> },
  { to: '/admin-dashboard/AdminSetting', label: 'Settings', icon: <IoSettings /> },
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 bg-gray-700 text-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-gray-700 text-white shadow-lg z-10
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
        `}
      >
        <div className="p-5 border-b border-gray-600">
          <h2 className="text-xl font-semibold text-center tracking-wide">MC Developer</h2>
        </div>

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
              onClick={() => setIsOpen(false)} // close sidebar on mobile when clicking
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-base">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
