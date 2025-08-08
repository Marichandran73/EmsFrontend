import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true); 
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
        if (err.response && !err.response.data.success) {
          alert(err.response.data.error);
        }
      } finally {
        setLoading(false); // Hide loader
      }
    };

    fetchEmployeeData();
  }, [id]);

  // Show loader while loading
  if (loading) {
    return (
      <div className="ml-[250px] mt-10 flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <span className="ml-4 text-gray-600 text-lg font-medium">
            Loading...
          </span>
        </div>
    );
  }

  return (
    <>
      {employee?.userId && (
        <div className="ml-[250px] mr-10 mt-10 flex flex-col md:flex-row items-start gap-10 bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="flex-shrink-0 mt-6">
            <img
              src={`http://localhost:3000/Public/Uploads/${employee.userId.profileImage}`}
              alt="Employee Profile"
              className="w-64 h-64 rounded-xl object-contain border-4 border-white shadow-md bg-white p-2"
            />
          </div>

          <div className="flex-1 bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {employee.userId.name}
            </h2>
            <ul className="space-y-2 text-gray-700 text-base">
              <li><span className="font-semibold">Email:</span> {employee.userId.email}</li>
              <li><span className="font-semibold">Department:</span> {employee.department}</li>
              <li><span className="font-semibold">Designation:</span> {employee.designation}</li>
              <li><span className="font-semibold">DOB:</span> {new Date(employee.dateOfBirth).toLocaleDateString()}</li>
              <li><span className="font-semibold">Phone:</span> {employee.phone}</li>
              <li><span className="font-semibold">Address:</span> {employee.address}</li>
              <li><span className="font-semibold">Salary:</span> ₹{employee.salary}</li>
              <li><span className="font-semibold">Gender:</span> {employee.gender}</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeProfile;
