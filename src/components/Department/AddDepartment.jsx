import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const navigate = useNavigate(); // This must be inside the component
  const [department, setDepartment] = useState({
    departmentName: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    // Fixed async arrow function syntax
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://emsbackend-z0kf.onrender.com/api/department/adddep",
        department,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departmentList");
        alert("Department added successfully");
      }
    } catch (err) {
      if (err.response && !err.response.data.success) {
        alert(err.response.data.error);
      }
    }
  };

  return (
  <>
    <h1 className="text-2xl mt-10 font-bold mb-6 text-gray-800 text-center md:text-left">
      Add Department
    </h1>

    <div className="max-w-xl mx-auto mt-10 p-6 px-4 sm:px-6 bg-white rounded-lg shadow-md">
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Department Name */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="department-name"
          >
            Department Name
          </label>
          <input
            type="text"
            id="department-name"
            name="departmentName"
            placeholder="Enter department name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description here"
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          Add Department
        </button>
      </form>
    </div>
  </>
);

};

export default AddDepartment;
