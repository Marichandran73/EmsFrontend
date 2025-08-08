import React, { useState, useEffect } from "react";
import {
  fetchDepartments,
  GetEmployee,
} from "../../pages/utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const [addSalary, setAddSalary] = useState({
    employeeId: "",
    department: "",
    basicSalary: 0,
    allowences: 0,
    deduction: 0,
    payDate: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch departments on mount
  useEffect(() => {
    const GetDepartment = async () => {
      const Department = await fetchDepartments();
      setDepartments(Department || []);
    };
    GetDepartment();
  }, []);

  // Handle department selection and fetch employees
  const handleDepartment = async (e) => {
    const selectedDept = e.target.value;
    const Emp = await GetEmployee(selectedDept);
    setEmployeeList(Emp || []);
  
  };

  // Handle changes for employeeId and other fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddSalary((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit salary data
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log("salary verifying", addSalary); 

    const response = await axios.post(
      `http://localhost:3000/api/Salary/addsalarys`,
      addSalary,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("inner response", response.data.message);

    if (response.data.success) {
      alert("Successfully saved the salary");
      navigate("/admin-dashboard/EmployeeList");
    }
  } catch (error) {
    console.error("Error adding salary:", error);
    alert("Failed to add salary.");
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
            👤 Add Salary
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Department */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Department
              </label>
              <select
                name="department"
                required
                onChange={handleDepartment}
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

            {/* Employee */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Employee ID
              </label>
              <select
                name="employeeId"
                required
                onChange={handleChange}
                value={addSalary.employeeId}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Employee</option>
                {employeeList.length === 0 ? (
                  <option disabled>No employees found</option>
                ) : (
                  employeeList.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name} ({emp.employeeId})
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Basic Salary */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Basic Salary
              </label>
              <input
                type="number"
                name="basicSalary"
                placeholder="Enter basic salary"
                required
                onChange={handleChange}
                value={addSalary.basicSalary}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Allowances */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Allowances
              </label>
              <input
                type="number"
                name="allowences"
                placeholder="Monthly allowances"
                required
                onChange={handleChange}
                value={addSalary.allowences}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Deduction */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Deduction
              </label>
              <input
                type="number"
                name="deduction"
                placeholder="Enter deduction"
                required
                onChange={handleChange}
                value={addSalary.deduction}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Payment Date
              </label>
              <input
                type="date"
                name="payDate"
                required
                onChange={handleChange}
                value={addSalary.paymentDate}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold shadow"
              >
                Add Salary
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddSalary;
