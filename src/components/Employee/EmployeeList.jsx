import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { getEmployeeColumns } from "../../pages/utils/EmployeeHelper";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [emploading, setEmpLoading] = useState(true);
  const [searchEmployee, setSearchEmployee] = useState([]);

  const FilterDepartment = (e) => {
    const Searchs = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setSearchEmployee(Searchs);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setEmpLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login again.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/employee/getemp",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          let SNo = 1;
          const data = response.data.employee.map((emp) => ({
            _id: emp._id,
            SNo: SNo++,
            image: emp.userId.profileImage,
            departmentName: emp.department,
            DateOfBirth: emp.dateOfBirth,
            name: emp.userId.name,
          }));
          setEmployees(data);
          setSearchEmployee(data);
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        if (err.response && !err.response.data.success) {
          alert(err.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <>
      {emploading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <span className="ml-4 text-gray-600 text-lg font-medium">
            Loading...
          </span>
        </div>
      ) : (
        <div className="ml-[250px] mr-10 mt-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center mt-10">
            📋 Employee List
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <input
              type="text"
              className="w-full sm:w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="🔍 Search department..."
              onChange={FilterDepartment}
            />

            <Link
              to="/admin-dashboard/add-employee"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-md shadow"
            >
              ➕ Add New Employee
            </Link>
          </div>

          <div className="w-full  mt-10  rounded-lg border border-gray-300 shadow-lg p-6 bg-white">
            <DataTable
              columns={getEmployeeColumns()}
              data={searchEmployee || employees}
              pagination
              responsive
              striped
              highlightOnHover
              customStyles={{
                rows: {
                  style: {
                    minHeight: "90px",
                  },
                },
                headCells: {
                  style: {
                    fontSize: "18px",
                    fontWeight: "bold",
                    padding: "16px",
                  },
                },
                cells: {
                  style: {
                    fontSize: "16px",
                    padding: "16px",
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeList;
