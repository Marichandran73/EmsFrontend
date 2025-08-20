import React from 'react';
import '../assets/css/Style.css';
import { useAuth } from '../Context/authContext';
import EmployeeSidebar from '../components/EmployeeDashboard/EmployeeSidebar';
import NavBars from '../components/Dashboard/NavBars';
import { FaUserTie } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const EmployeDashboard = () => {
  const { user } = useAuth();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="bg-white-dark text-black dark:text-white h-100vh ">
      <NavBars />

      <div className="flex">
        <EmployeeSidebar />

        <div className="flex-1 ml-40 mt-20 pr-6"> 
         
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center mb-6">
            <div className="text-5xl text-blue-500 mr-4">
              <FaUserTie />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {greeting()}, welcome back
              </h3>
              <p className="text-2xl text-gray-600">{user?.name || "Guest"}</p>
            </div>
          </div>

          {/* Page Content */}
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeDashboard;
