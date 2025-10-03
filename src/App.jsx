import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeDashboard from "./pages/EmployeDashboard.jsx";

import PrivateRoutes from "./utils/PrivateRoutes.jsx";

import RoleBasedRoute from "./utils/RoleBasedRoute.jsx";
import AdminSummary from "./components/Dashboard/AdminSummary.jsx";
import DepartmentList from "./components/Department/DepartmentList.jsx";
import EmployeeSetting from "./components/EmployeeDashboard/EmployeeSetting.jsx";
import AddDepartment from "./components/Department/AddDepartment.jsx";
import EditDepartment from "./components/Department/EditDepartment.jsx";
import EmployeeList from "./components/Employee/EmployeeList.jsx";
import AddEmployee from "./components/Employee/AddEmployee.jsx";
import EmployeeView from "./components/Employee/EmployeeView.jsx";
import EmployeeEdit from "./components/Employee/EmployeeEdit.jsx";
import AddSalarys from "./components/Salary/AddSalary.jsx";
import SalaryList from "./components/Salary/SalaryList.jsx";
import AdminSetting from './components/Dashboard/AdminSetting.jsx';
import Login from "./pages/Login.jsx";
import "./index.css";

import NewLeave from "./components/Leave/AddLeave.jsx";
import LeaveList from "./components/Leave/LeaveList.jsx";
import LeaveTable from "./components/Leave/LeaveTable.jsx";
import ViewLeaves from "./components/Leave/ViewLeaves.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBasedRoute requiredRoles={["Admin"]}>
                  <AdminDashboard />
                </RoleBasedRoute>
              </PrivateRoutes>
            }
          >
            <Route index element={<AdminSummary />} />
            <Route path="departmentList" element={<DepartmentList />} />
            <Route path="Add-department" element={<AddDepartment />} />
            <Route path="department/:id" element={<EditDepartment />} />
            <Route path="EmployeeList" element={<EmployeeList />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="employee/:id" element={<EmployeeView />} />
            <Route path="employee/Edit/:id" element={<EmployeeEdit />} />
            <Route path="Add-Salary" element={<AddSalarys />} />
            <Route path="employees/Salary/:id" element={<SalaryList />} />
            <Route path="leaves" element={<LeaveTable />} />
            <Route path="ViewLeaves/:id" element={<ViewLeaves />} />
          <Route path="LeaveList/:id" element={<LeaveList />} />
          <Route path="AdminSetting" element={<AdminSetting />} />

          </Route>

          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoutes>
                <RoleBasedRoute requiredRoles={["Admin", "Employee"]}>
                  <EmployeDashboard />
                </RoleBasedRoute>
              </PrivateRoutes>
            }
          >
            <Route path="profile/:id" element={<EmployeeView />} />
            <Route path="Add-newLeave" element={<NewLeave />} />
            <Route path="LeaveList" element={<LeaveList />} />
            <Route path="EmpSalary/:id" element={<SalaryList />} />
            <Route path="EmpSettings" element={<EmployeeSetting />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
