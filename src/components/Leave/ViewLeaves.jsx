import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewLeaves = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://emsbackend-z0kf.onrender.com/api/Leave/getDetails/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.Leave);
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

  const changeStatus = async (id, status) => {
    console.log("Frontend sending ID:", id, "Status:", status);
    try {
      const response = await axios.put(
        `https://emsbackend-z0kf.onrender.com/api/Leave/updateStatus/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      if (err.response && !err.response.data.success) {
        alert(err.response.data.error);
      }
    }
  };

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
      {leave?.employeeId && (
        <div className="px-4 sm:px-6 lg:px-10 mt-10 flex flex-col md:flex-row items-start gap-6 bg-gray-100 p-6 rounded-lg shadow-lg sm:ml-64">
          {/* Profile Image */}
          <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto">
            <img
              src={`https://emsbackend-z0kf.onrender.com/Public/Uploads/${leave?.employeeId?.userId?.profileImage}`}
              alt="Employee Profile"
              className="w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-xl object-contain border-4 border-white shadow-md bg-white p-2"
            />
          </div>

          {/* Employee Details */}
          <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
              {leave?.employeeId?.name}
            </h2>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li>
                <span className="font-semibold">Employee ID:</span>{" "}
                {leave?.employeeId?.employeeId}
              </li>
              <li>
                <span className="font-semibold">Department:</span>{" "}
                {leave?.employeeId?.department}
              </li>
              <li>
                <span className="font-semibold">Designation:</span>{" "}
                {leave?.employeeId?.designation}
              </li>
              <li>
                <span className="font-semibold">Leave Type:</span>{" "}
                {leave?.leaveType}
              </li>
              <li>
                <span className="font-semibold">Reason:</span> {leave?.reason}
              </li>
              <li>
                <span className="font-semibold">Start Date:</span>{" "}
                {new Date(leave?.startDate).toLocaleDateString()}
              </li>
              <li>
                <span className="font-semibold">End Date:</span>{" "}
                {new Date(leave?.endDate).toLocaleDateString()}
              </li>
              <li>
                <span className="font-semibold">Phone:</span>{" "}
                {leave?.employeeId?.phone}
              </li>
              <div className="flex space-x-6 mb-2">
                <h1 className="text-lg font-bold">
                  {leave.status === "pending" ? "Action :" : "Status :"}
                </h1>
                {leave.status === "pending" ? (
                  <div className="flex space-x-5">
                    <button
                      className="bg-green-500 h-10 w-20 text-white rounded border-none"
                      onClick={() => changeStatus(leave._id, "approved")}
                    >
                      Approved
                    </button>
                    <button
                      className="bg-red-500 h-10 w-20 text-white rounded border-none"
                      onClick={() => changeStatus(leave._id, "rejected")}
                    >
                      Rejected
                    </button>
                  </div>
                ) : (
                  <li>
                    {leave.status === "rejected" ? (
                      <span className="font-semibold text-red-700">
                        {leave?.status}
                      </span>
                    ) : (
                      <span className="font-semibold text-green-700">
                        {leave?.status}
                      </span>
                    )}
                  </li>
                )}
              </div>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewLeaves;
