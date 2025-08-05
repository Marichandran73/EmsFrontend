import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState({});
  const [deploading, setDepLoading] = useState(false);

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data);
        if (response.data.success) {
          setDepartment(response.data.department);
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        if (err.response && !err.response.data.success) {
          alert(err.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/department/${id}`, department, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        alert('Department updated successfully!');
        navigate('/admin-dashboard/departmentList');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Error updating department');
      console.error(error);
    }
  };

  return (
    <>
      {deploading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="text-2xl mt-10 font-bold mb-6 text-gray-800">Edit Department</h1>
          <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="department-name">
                  Department Name
                </label>
                <input
                  type="text"
                  id="department-name"
                  name="departmentName"
                  value={department.departmentName || ''}
                  placeholder="Enter department name"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={department.description || ''}
                  placeholder="Enter description here"
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
              >
                Edit Department
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditDepartment;
