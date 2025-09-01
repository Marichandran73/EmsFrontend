import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { leaveColumns } from "../../utils/LeaveHelpers";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from '../../context/authContext';

const LeaveList = () => {
  const { user } = useAuth();
  const [employeeLeaves, setEmployeeLeaves] = useState([]);
  const [loading ,setLoading]=useState(false)
 

  
    const fetchLeaves = async () => {

      try {
        setLoading(true);
        const response = await axios.get(
          `https://emsbackend-z0kf.onrender.com/api/Leave/getLeave/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployeeLeaves(response.data.getLeaves || []);
        }
      } catch (err) {
        console.error(err);
        if (err.response && !err.response.data.success) {
          alert(err.response.data.message);
        }
      }finally{
        setLoading(false)
      }
    };
    useEffect(() => {
      fetchLeaves();
    }, [])

  return (
    <>
    {
  loading ? (
    <div className="ml-[250px] mt-5 flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      <span className="ml-4 text-gray-600 text-lg font-medium">
        Loading...
      </span>
    </div>
  ) : (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📋 Manage leave
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          className="w-full sm:w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="🔍 Search department..."
        />

        <Link
          to="/employee-dashboard/Add-newLeave"
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-md shadow"
        >
          ➕ Add New leave
        </Link>
      </div>

      <div className="overflow-auto max-h-[calc(100vh-20rem)] mt-10 rounded-lg border border-gray-300 shadow-lg p-6 bg-white">
        <DataTable
          columns={leaveColumns()}
          data={employeeLeaves}
          pagination
          responsive
          striped
          highlightOnHover
          customStyles={{
            rows: { style: { minHeight: "90px" } },
            headCells: {
              style: {
                fontSize: "18px",
                fontWeight: "bold",
                padding: "16px",
              },
            },
            cells: { style: { fontSize: "16px", padding: "16px" } },
          }}
        />
      </div>
    </div>
  )
}

    </>
  );
};

export default LeaveList;
