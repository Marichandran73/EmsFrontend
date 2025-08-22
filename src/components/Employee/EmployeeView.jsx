import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeView = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(
          `https://emsbackend-z0kf.onrender.com/api/employee/${id}`,
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
        setLoading(false); 
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
        <div className="ml-80 w-full px-4 sm:px-6 lg:px-8 mt-10">
          <div className="flex flex-col md:flex-row items-start gap-8 bg-gray-100 p-6 rounded-lg shadow-lg">
            
            {/* Profile Image */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={`https://emsbackend-z0kf.onrender.com/Public/Uploads/${employee.userId.profileImage}`}
                alt="Employee Profile"
                className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-xl object-contain border-4 border-white shadow-md bg-white p-2"
              />
            </div>

            {/* Employee Details */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow-inner border border-gray-200 w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
                name: {employee.userId.name}
              </h2>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
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
        </div>
      )}
    </>
  );
};

export default EmployeeView;
