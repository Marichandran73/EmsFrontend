import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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

export const EmployeeButton = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      <button
        className="h-10 px-4 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        onClick={() => navigate(`/admin-dashboard/employee/${id}`)}
      >
        View
      </button>
      <button className="h-10 px-4 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition"
      onClick={()=> navigate(`/admin-dashboard/employee/Edit/${id}`)}>
        Edit
      </button>
      <button className="h-10 px-4 rounded bg-purple-500 text-white hover:bg-purple-600 transition">
        Salary
      </button>
      <button className="h-10 px-4 rounded bg-green-600 text-white hover:bg-green-700 transition">
        Leave
      </button>
    </div>
  );
};
export const getEmployeeColumns = ()=>[{
      name: 'S.No', 
     selector: (row) => row.SNo,
      sortable: true,
    },
    {
      name:'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name:'Department',
      selector: (row) => row.departmentName,
      sortable: true,
    },
    {
      name:'Date of Birth',
      selector: (row) => row.DateOfBirth,
    },
    {
    name: 'Profile',
    selector: (row) => (
      <img
        src={`http://localhost:3000/Public/Uploads/${row.image}`}
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover object-top"
        onError={(e) => (e.target.style.display = 'none')}
      />
    ),
  },
    {
      name:'Actions',
      cell: (row) => (
      <EmployeeButton id={row._id} />
    )
    },
    ]