import React, { useState, useEffect } from "react";
import { fetchDepartments } from "../../pages/utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const GetDepartment = async () => {
      const Department = await fetchDepartments();
      setDepartments(Department);
    };
    GetDepartment();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const FormdataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      FormdataObj.append(key, formData[key]);
    });
    //     for (let [key, value] of FormdataObj.entries()) {
    //   console.log(`${key}:`, value);
    // }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://emsbackend-z0kf.onrender.com/api/employee/addemp",
        FormdataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/EmployeeList");
        alert("Employee added successfully");
      }
    } catch (err) {
      if (err.response && !err.response.data.success) {
        alert(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="ml-[250px] mt-10 flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <span className="ml-4 text-gray-600 text-lg font-medium">
            Loading...
          </span>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-lg shadow-lg mt-10 h-[800px] overflow-y-scroll">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            👤 Add New Employee
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Enter full name"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter email"
                required
                onChange={handleChange}
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
                autoComplete="tel"
                placeholder="Enter phone number"
                required
                onChange={handleChange}
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
                autoComplete="department"
                placeholder="Enter department"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Department
              </label>
              <select
                name="department"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>

                {departments.map((dep) => (
                  <option key={dep._id} value={dep.departmentName}>
                    {dep.departmentName}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Gender
              </label>
              <select
                name="gender"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/*  Date of birth */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                autoComplete="dateOfBirth"
                required
                onChange={handleChange}
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
                placeholder="Enter salary"
                autoComplete="salary"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Employee ID */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                placeholder="Enter employee ID"
                autoComplete="employeeId"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-1">
                Upload Employee Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                autoComplete="image"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                autoComplete="new-password"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Role
              </label>
              <select
                name="role"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-1">
                Address
              </label>
              <textarea
                name="address"
                rows="3"
                placeholder="Enter address"
                autoComplete="address"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold shadow"
              >
                Save Employee
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddEmployee;
