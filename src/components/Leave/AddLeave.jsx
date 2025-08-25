import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLeave = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [leaves, setLeaves] = useState({
    UserIds: user?._id || "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaves((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://emsbackend-z0kf.onrender.com/api/Leave/addLeave',
        leaves,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response?.data?.success) {
        alert(response.data.message);
        navigate('/employee-dashboard/LeaveList');
      }
    } catch (err) {
      console.error('Error:', err);
      const errorMessage =
        err?.response?.data?.message || 'An error occurred while submitting leave';
      alert(errorMessage);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        Request for Leave
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Leave Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Leave Type
          </label>
          <select
            name="leaveType"
            value={leaves.leaveType}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          >
            <option value="">Select leave type</option>
            <option value="sick leave">Sick Leave</option>
            <option value="plan leave">Plan Leave</option>
            <option value="casual leave">Casual Leave</option>
            <option value="annual leave">Annual Leave</option>
            <option value="medical leave">Medical Leave</option>
          </select>
        </div>

        {/* From Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            name="startDate"
            value={leaves.startDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            name="endDate"
            value={leaves.endDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="reason"
            value={leaves.reason}
            placeholder="Enter description here..."
            required
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200"
        >
          Add Leave
        </button>
      </form>
    </div>
  </div>
);

};

export default AddLeave;
