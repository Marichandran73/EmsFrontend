import axios from 'axios';
import React, { useState, useEffect , useRef} from 'react';
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
  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex justify-center items-center" ref={menuRef}>
      {/* Three Dots Button */}
      <button
        className="h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-200 transition"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <BsThreeDotsVertical size={22} />
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute top-12 right-0 w-44 bg-white border shadow-xl rounded-lg p-2 z-20 animate-fadeIn">
          <button
            className="block w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 text-blue-600 font-medium"
            onClick={() => navigate(`/admin-dashboard/employee/${id}`)}
          >
            View
          </button>
          <button
            className="block w-full text-left px-4 py-2 rounded-md hover:bg-yellow-100 text-yellow-600 font-medium"
            onClick={() => navigate(`/admin-dashboard/employee/Edit/${id}`)}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 rounded-md hover:bg-purple-100 text-purple-600 font-medium"
            onClick={() => navigate(`/admin-dashboard/employees/Salary/${id}`)}
          >
            Salary
          </button>
          <button
            className="block w-full text-left px-4 py-2 rounded-md hover:bg-green-100 text-green-600 font-medium"
          >
            Leave
          </button>
          <button
            className="block w-full text-left px-4 py-2 rounded-md hover:bg-red-100 text-red-600 font-medium"
            onClick={() => setShowMenu(false)}
          >
            Cancel
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
