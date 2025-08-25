import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom"
import axios from "axios"; 

const EmployeeSetting = () => {
  const { user } = useAuth();
  const navigate= useNavigate();

  const [error, setError] = useState(null);
  const [setting, setSetting] = useState({
    userId: user?._id || "",
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("setting user", setting);

  if (setting.NewPassword !== setting.ConfirmPassword) {
    setError("Password mismatch! Kindly check again.");
    return;
  }

  try {
    const response = await axios.put(
      "https://emsbackend-z0kf.onrender.com/api/Setting/Password-change",
      setting,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      alert("Password changed successfully!");
      setError(null);
      navigate(`/employee-dashboard/profile/${user._id}`);
    }
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong! Please try again.");
  }
};


  return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md"
    >
      {/* Title */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-700 sm:text-3xl">
          Change Password
        </h2>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Old Password */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2 font-medium text-sm sm:text-base">
          Old Password
        </label>
        <input
          type="password"
          name="OldPassword"
          value={setting.OldPassword}
          required
          placeholder="Enter old password"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
        />
      </div>

      {/* New Password */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2 font-medium text-sm sm:text-base">
          New Password
        </label>
        <input
          type="password"
          name="NewPassword"
          value={setting.NewPassword}
          required
          placeholder="Enter new password"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
        />
      </div>

      {/* Confirm Password */}
      <div className="mb-6">
        <label className="block text-gray-600 mb-2 font-medium text-sm sm:text-base">
          Confirm Password
        </label>
        <input
          type="password"
          name="ConfirmPassword"
          value={setting.ConfirmPassword}
          required
          placeholder="Confirm new password"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-2 sm:py-3 rounded-lg hover:bg-indigo-600 transition duration-300 text-sm sm:text-base font-medium"
      >
        Submit
      </button>
    </form>
  </div>
);

};

export default EmployeeSetting;
