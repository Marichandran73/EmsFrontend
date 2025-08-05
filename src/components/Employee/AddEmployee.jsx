import React, { useState } from 'react';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    gender: '',
    joiningDate: '',
    salary: '',
    address: '',
    employeeId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employee Data:', employee);
    // Submit the employee data here (axios, fetch, etc.)
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">👤 Add New Employee</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Department</label>
          <input
            type="text"
            name="department"
            placeholder="Enter department"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Designation */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Designation</label>
          <input
            type="text"
            name="designation"
            placeholder="Enter designation"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Gender</label>
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

        {/* Joining Date */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Date of Joining</label>
          <input
            type="date"
            name="joiningDate"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Salary</label>
          <input
            type="number"
            name="salary"
            placeholder="Enter salary"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            placeholder="Enter employee ID"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-1">Address</label>
          <textarea
            name="address"
            rows="3"
            placeholder="Enter address"
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
  );
};

export default AddEmployee;
