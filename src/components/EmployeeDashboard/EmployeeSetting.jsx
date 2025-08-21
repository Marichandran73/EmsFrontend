import React, { useState } from "react";
import { useAuth } from "../../context/Authcontext";
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
    <div className="flex justify-center items-center h-auto bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        {/* Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            Change Password
          </h2>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Old Password */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">
            Old Password
          </label>
          <input
            type="password"
            name="OldPassword"
            value={setting.OldPassword}
            required
            placeholder="Enter old password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">
            New Password
          </label>
          <input
            type="password"
            name="NewPassword"
            value={setting.NewPassword}
            required
            placeholder="Enter new password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="ConfirmPassword"
            value={setting.ConfirmPassword}
            required
            placeholder="Confirm new password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeSetting;
