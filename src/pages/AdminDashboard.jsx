import React from 'react';
import '../assets/css/Style.css'
import { useAuth } from '../Context/authContext';
import AdminSidebar from '../components/Dashboard/AdminSidebar';
import NavBars from '../components/Dashboard/NavBars';

import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  

  return (
    <>
    <div className='bg-white-dark text-black dark:text-white '>

      <NavBars/>
    <div className="flex flex-col h-screen bg-gray-100 w-full Top-0 left-0 fixed">
      <AdminSidebar/>
      {/* <AdminSummary/> */}
      <Outlet/>
    </div>
    </div>
    </>
  );
};

export default AdminDashboard;
