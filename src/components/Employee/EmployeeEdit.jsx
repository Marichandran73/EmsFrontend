import React, { useState, useEffect } from "react";
import { fetchDepartments } from "../../pages/utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
          `http://localhost:3000/api/employee/${id}`,
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
      // Nested userId updates (e.g., name/email inside userId)
      setEmployee((prev) => ({
        ...prev,
        userId: {
          ...prev.userId,
          [name]: value,
        },
      }));
    } else {
      // Flat fields like phone, designation, etc.
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
        `http://localhost:3000/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Employee updated successfully!");
        navigate(-1);
      } else {
        alert("Update failed!");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <>
      {departments && employee ? (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-lg shadow-lg mt-10 h-[800px] overflow-y-scroll">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Edit Employee
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold shadow"
              >
                Save Employee
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold shadow ml-4"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <span className="ml-4 text-gray-600 text-lg font-medium">
            Loading...
          </span>
        </div>
      )}
    </>
  );
};

export default EmployeeEdit;
