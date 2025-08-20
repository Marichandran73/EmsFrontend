import React, { useState, useEffect } from "react";
import {
  fetchDepartments,
  GetEmployee,
} from "../../pages/utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const [departments, setDepartments] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [addSalary, setAddSalary] = useState({
    employeeId:'',
    basicSalary: '',
    allowences: '',
    deduction: '',
    payDate: '',
  });

  // Fetch departments on page load
  useEffect(() => {
    const GetDepartment = async () => {
      try {
        const Department = await fetchDepartments();
        console.log("outer response", Department);
        setDepartments(Array.isArray(Department) ? Department : []);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
      }
    };
    GetDepartment();
  }, []);

  // Handle department change -> Fetch employees
  const handleDepartment = async (e) => {
    const selectedDept = e.target.value;
    
    try {
      const Emp = await GetEmployee(selectedDept);

      // Always set as array
      if (Array.isArray(Emp)) {
        setEmployeeList(Emp);
      } else if (Emp && Array.isArray(Emp.data)) {
        setEmployeeList(Emp.data);
      } else {
        setEmployeeList([]);
      }

      // Also store department in salary data
      setAddSalary((prev) => ({
        ...prev,
        department: selectedDept,
      }));
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployeeList([]);
    }
  };

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
      const response = await axios.post(
        `https://emsbackend-z0kf.onrender.com/api/Salary/addsalarys`,
        addSalary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Successfully saved the salary");
        navigate(`/admin-dashboard/employees/Salary/${id}`);
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
             Add Salary
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
                {Array.isArray(employeeList) && employeeList.length > 0 ? (
                  employeeList.map((emp) => (
                    <option key={emp._id} value={emp._id}> 
                    {emp.name} ({emp.employeeId})
                    </option>
                  ))
                ) : (
                  <option disabled>No employees found</option>
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
                value={addSalary.basicSalary || ""}
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
                placeholder="Monthly allowences"
                required
                onChange={handleChange}
                value={addSalary.allowences || ""}
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
                value={addSalary.deduction || ""}
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
                value={addSalary.payDate || ""}
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
