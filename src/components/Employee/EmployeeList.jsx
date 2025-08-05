import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeList = () => {
  return (
    <>
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center mt-10">📋 Employee List</h1>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <input
              type="text"
              className="w-full sm:w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="🔍 Search department..."
            
            />

            <Link
              to="/admin-dashboard/add-employee"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-md shadow"
            >
              ➕ Add New Department
            </Link>
          </div>

         </>
  )
}

export default EmployeeList