import React, { useEffect, useState } from "react";
import axios from "axios";
import { LeaveButton, AdminLeaveCol } from "../../pages/utils/LeaveHelpers";
import DataTable from "react-data-table-component";

const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchLeaves = async () => {
    setLeaveLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please login again.");
      setLeaveLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/api/Leave/AllLeaves",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success && Array.isArray(response.data.Leaves)) {
        const data = response.data.Leaves.map((leave,index) => ({
           SNo:index+1,
          _id: leave._id,
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId?.userId?.name || "N/A",
          leaveType: leave.leaveType,
          departmentName: leave.employeeId?.department || "N/A",
          day:
            (new Date(leave.endDate).getTime() -
              new Date(leave.startDate).getTime()) /
              (1000 * 60 * 60 * 24) +
            1,
          status: leave.status,
          action: <LeaveButton Id={leave._id} />,
        }));

        setLeaves(data);
      } else {
        alert("No leave records found");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || "Something went wrong!");
      } else {
        alert(err.message);
      }
    } finally {
      setLeaveLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // 🔍 Search + Filter logic
  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch =
      (leave.departmentName?.toLowerCase() || "").includes(
        search.toLowerCase()
      ) ||
      (leave.name?.toLowerCase() || "").includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      leave.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {leaveLoading ? (
        <div className="ml-[250px] mt-10 flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <span className="ml-4 text-gray-600 text-lg font-medium">
            Loading...
          </span>
        </div>
      ) : (
        <div className="mt-20 ml-64">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📋 Manage Leave
          </h1>

          {/* 🔎 Search + Status filter */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <input
              type="text"
              className="w-full sm:w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="🔍 Search department or employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex gap-3 mr-5">
              {["Pending", "Approved", "Reject", "All"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`h-10 px-4 py-2 rounded ${
                    statusFilter === status
                      ? status === "Reject"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                      : "bg-lime-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* 📊 Table */}
          <DataTable
            columns={AdminLeaveCol()}
            data={filteredLeaves}
            pagination
            progressPending={leaveLoading}
          />
        </div>
      )}
    </>
  );
};

export default LeaveTable;
