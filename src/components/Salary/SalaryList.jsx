import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { getSalaryColumns } from "../../Pages/utils/SalaryHelper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const SalaryList = () => {
  const { id } = useParams();
  const [salary, setSalary] = useState([]);
  const [Salaryloading, setSalaryLoading] = useState(false);
  const navigate = useNavigate();
  
  const { user } = useAuth();
const [hideAddSalary, setHideAddSalary] = useState(false);

useEffect(() => {
  if (user?.role === "Admin") {
    setHideAddSalary(true);
  } else {
    setHideAddSalary(false);
  }
}, [user]);

  useEffect(() => {
    const fetchSalaryById = async () => {
      setSalaryLoading(true);
      try {
        const response = await axios.get(
          `https://emsbackend-z0kf.onrender.com/api/salary/forUser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("id data :", response.data);

        if (response.data.success) {
          const formattedData = response.data.salary.map((sal, index) => ({
            SNo: index + 1,
            employeeId: sal.employeeId.employeeId,
            basicSalary: sal.basicSalary,
            allowences: sal.allowences || 0,
            deduction: sal.deduction || 0,
            netSalary: sal.netSalary,
            payDate: sal.payDate,
          }));

          setSalary(formattedData);
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          navigate("/admin-dashboard/Add-Salary");
        } else {
          alert("Failed to fetch salary data.");
        }
      } finally {
        setSalaryLoading(false);
      }
    };

    fetchSalaryById();
  }, [id]);

  return (
    <div className="w-full lg:max-w-7xl mx-auto px-6 py-8">
      {Salaryloading ? (
        <div className="ml-[250px] mt-7 flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <span className="ml-4 text-gray-600 text-lg font-medium">
            Loading...
          </span>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📋 Salary List
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <input
              type="text"
              className="w-full sm:w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="🔍 Search department..."
            />
            {hideAddSalary ? (
              <Link
                to="/admin-dashboard/Add-Salary"
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-md shadow"
              >
                ➕ Add Salary
              </Link>
            ) : null}
          </div>

          <div className="overflow-auto max-h-[calc(100vh-20rem)] mt-10 rounded-lg border border-gray-300 shadow-lg p-6 bg-white">
            <DataTable
              columns={getSalaryColumns()}
              data={Array.isArray(salary) ? salary : []}
              progressPending={Salaryloading}
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
        </>
      )}
    </div>
  );
};

export default SalaryList;
