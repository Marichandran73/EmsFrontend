import React, { useState, useEffect } from "react";
import { fetchDepartments } from "../../Pages/utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeEdit = () => {
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const GetDepartment = async () => {
      const Department = await fetchDepartments();
      setDepartments(Department);
    };
    GetDepartment();
  }, []);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `https://emsbackend-z0kf.onrender.com/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        console.error("Error fetching employee:", err);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" || name === "email") {
      setEmployee((prev) => ({
        ...prev,
        userId: {
          ...prev.userId,
          [name]: value,
        },
      }));
    } else {
      setEmployee((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://emsbackend-z0kf.onrender.com/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Data updated successfully!');  
        setTimeout(() => navigate(-1), 1000); 
      } else {
        toast.error("Update failed!");  
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
  <>
    {departments && employee ? (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 bg-white rounded-lg shadow-lg mt-6 sm:mt-10 h-auto sm:h-[800px] sm:overflow-y-scroll">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          ✏️ Edit Employee
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={employee.userId?.name || ""}
              autoComplete="name"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={employee.phone || ""}
              onChange={handleChange}
              autoComplete="tel"
              required
              className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={employee.designation || ""}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={employee.salary || ""}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={employee.address || ""}
              onChange={handleChange}
              rows="3"
              required
              className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Action buttons */}
          <div className="md:col-span-2 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2 rounded-md font-semibold shadow w-full sm:w-auto"
            >
              Save Employee
            </button>
            <button
              type="button"
              onClick={() => {
                toast.info("Edit cancelled");
                setTimeout(() => navigate(-1), 2000);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-5 sm:px-6 py-2 rounded-md font-semibold shadow w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div className="ml-0 sm:ml-[250px] mt-10 flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-gray-600 text-lg font-medium">
          Loading...
        </span>
      </div>
    )}

    <ToastContainer
      position="top-right"
      style={{ marginTop: "40px" }}
      autoClose={3000}
    />
  </>
);

};

export default EmployeeEdit;
