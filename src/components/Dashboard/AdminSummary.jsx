import React, { useState, useEffect } from "react";
import axios from "axios"; 
import SummaryCard from "./SummaryCard";
import { FaUsers, FaBuilding } from "react-icons/fa";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdCancel, MdPendingActions } from "react-icons/md";
import { IoIosCloudDone } from "react-icons/io";

const AdminSummary = () => {
  const [employee, setEmployee] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState([]);
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://emsbackend-z0kf.onrender.com/api/employee/getemp",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data?.employee) {
          setEmployee(response.data.employee); 
        }
      } catch (err) {
        if (err.response?.data?.error) {
          alert(err.response.data.error);
        } else {
          console.error("Error fetching employees:", err);
        }
      }
    };

    fetchEmployees();
  }, []);



  useEffect(() => {
    const fetchleaves = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/Leave/AllLeaves",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data?.Leaves) {
          setLeaveStatus(response.data.Leaves); 
        }
      } catch (err) {
        if (err.response?.data?.error) {
          alert(err.response.data.error);
        } else {
          console.error("Error fetching employees:", err);
        }
      }
    };

    fetchleaves();
  }, []);
  const approvedCount = leaveStatus.filter(l => l.status === "approved").length;
  const rejectedCount = leaveStatus.filter(l => l.status === "rejected").length;
  const pendingCount = leaveStatus.filter(l => l.status === "pending").length;

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-4 md:p-8 md:ml-64 space-y-12">
        {/* Dashboard Overview */}
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 text-left mb-8 mt-4">
            Dashboard Overview
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard icon={<FaUsers />} text="Active Employees" number={employee.length} />
            <SummaryCard icon={<FaBuilding />} text="Total Departments" number={5} />
            <SummaryCard icon={<CiMoneyCheck1 />} text="Total Users" number={employee.length+1} />
          </div>
        </div>

        {/* Leave Section */}
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 text-left mb-8">
            Leave
          </h1>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SummaryCard icon={<IoNewspaperOutline />} text="Leave Applied" number={3} />
              <SummaryCard icon={<IoIosCloudDone />} text="Leave Approved" number={approvedCount} />
              <SummaryCard icon={<MdPendingActions />} text="Leave Pending" number={pendingCount} />
              <SummaryCard icon={<MdCancel />} text="Leave Rejected" number={rejectedCount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
