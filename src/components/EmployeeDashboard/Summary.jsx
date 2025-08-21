import React from 'react';
import { FaUserTie } from "react-icons/fa";
import useAuth from '../../context/Authcontext';

const Summary = () => {
  let user;

  try {
    const auth = useAuth();
    user = auth?.user;
  } catch (error) {
    console.error("Error using auth context:", error);
    return <div>Error loading user data</div>;
  }

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center w-full ml-10 mb-4">
      <div className="text-5xl text-blue-500 mr-4"><FaUserTie /></div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{greeting()}, welcome back</h3>
        <p className="text-2xl text-gray-600">{user?.name || "Guest"}</p>
      </div>
    </div>
  );
};

export default Summary;
