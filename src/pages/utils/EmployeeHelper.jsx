import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";


export const fetchDepartments = async () => {
    let department;
    try {
      const response = await axios.get('http://localhost:3000/api/department', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
         department= response.data.departments
        }
      } catch (err) {
        if (err.response && !err.response.data.success) {
          alert(err.response.data.error);
        }
      }
      return department;
    };


export const GetEmployee = async (id) => {
  let employees;
  try {
    const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.success) {
      employees = response.data.employee; 
    }
    console.log("response data",employees);
  } catch (err) {
    if (err.response && !err.response.data.success) {
      alert(err.response.data.message); 
    
    }
  }
  return employees;
};



export const EmployeeButton = ({ id }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative flex justify-center items-center">
      {/* Three Dots Button */}
      <button
        className="h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-200 transition"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <BsThreeDotsVertical size={25} />
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute top-1 h-20 min-w-40 right-0 flex gap-2 bg-white border shadow-lg rounded p-2 z-10">
          <button
            className="h-10 px-4 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={() => navigate(`/admin-dashboard/employee/${id}`)}
          >
            View
          </button>
          <button
            className="h-10 px-4 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition"
            onClick={() => navigate(`/admin-dashboard/employee/Edit/${id}`)}
          >
            Edit
          </button>
          <button
            className="h-10 px-4 rounded bg-purple-500 text-white hover:bg-purple-600 transition"
            onClick={() => navigate(`/admin-dashboard/employees/Salary/${id}`)}
          >
            Salary
          </button>
          <button
            className="h-10 px-4 rounded bg-green-600 text-white hover:bg-green-700 transition"
          >
            Leave
          </button>
          <button
            className="h-10 px-4 rounded bg-red-600 text-white hover:bg-red-700 transition"
            onclick={()=>setShowMenu(false)}
          >
            cancel
          </button>
        </div>
      )}
    </div>
  );
};
export const getEmployeeColumns = () => [
  {
    name: 'S.No',
    selector: (row) => row.SNo,
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Department',
    selector: (row) => row.departmentName,
    sortable: true,
  },
  {
    name: 'Date of Birth',
    selector: (row) =>
      row.DateOfBirth ? new Date(row.DateOfBirth).toLocaleDateString() : 'N/A',
    sortable: true,
  },
  {
    name: 'Profile',
    cell: (row) => (
      <img
        src={`http://localhost:3000/Public/Uploads/${row.image}`}
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover object-top"
        onError={(e) => (e.target.style.display = 'none')}
      />
    ),
  },
  {
    name: 'Actions',
    cell: (row) => <EmployeeButton id={row._id} />,
  },
];
