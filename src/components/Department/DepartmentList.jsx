import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  getDepartmentColumns,
  DepartmentButton,
} from "../../Pages/utils/DepartmentHelpers";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [deploading, setDepLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState([]);

  const FilterDepartment = (e) => {
    const record = departments.filter((dep) =>
      dep.departmentName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchTerm(record);
  };

  const OnDepartmentDelete = async (id) => {
    const data = departments.filter((dep) => dep._id !== id);
    setDepartments(data);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "https://emsbackend-z0kf.onrender.com/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const data = response.data.departments.map((dep, index) => ({
            _id: dep._id,
            SNo: index + 1,
            departmentName: dep.departmentName,
            description: dep.description,
          }));

          setDepartments(data);
          setSearchTerm(data);
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

    fetchDepartments();
  }, []);

 return (
  <div className="w-full lg:max-w-7xl ml-64 mx-auto px-6 py-8">
    {deploading ? (
      // ✅ Loader Section
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-gray-600 text-lg font-medium">
          Loading...
        </span>
      </div>
    ) : (
      <>
        {/* ✅ Page Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📋 Department List
        </h1>

        {/* ✅ Search & Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            className="w-full sm:w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="🔍 Search department..."
            onChange={FilterDepartment}
          />

          <Link
            to="/admin-dashboard/Add-department"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-md shadow"
          >
            ➕ Add New Department
          </Link>
        </div>

        {/* ✅ Data Table */}
        <div className="overflow-auto max-h-[calc(100vh-20rem)] mt-10 rounded-lg border border-gray-300 shadow-lg p-6 bg-white">
          <DataTable
            columns={getDepartmentColumns(OnDepartmentDelete)}
            data={searchTerm}
            pagination
            responsive
            striped
            highlightOnHover
            dense
            customStyles={{
              rows: {
                style: {
                  minHeight: "80px",
                },
              },
              headCells: {
                style: {
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#f9fafb",
                },
              },
              cells: {
                style: {
                  fontSize: "15px",
                },
              },
            }}
          />
        </div>
      </>
    )}
  </div>
);

};

export default DepartmentList;
