import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeDashboard from "./pages/EmployeDashboard";
import PrivateRoutes from "./pages/utils/PrivateRoutes";
import RoleBasedRoute from "./pages/utils/RoleBasedRoute";
import AdminSummary from "./components/Dashboard/AdminSummary";
import DepartmentList from "./components/Department/DepartmentList";
import EmployeeSetting from "./components/EmployeeDashboard/EmployeeSetting";
import AddDepartment from "./components/Department/AddDepartment";
import EditDepartment from "./components/Department/EditDepartment";
import EmployeeList from "./components/Employee/EmployeeList";
import AddEmployee from "./components/Employee/AddEmployee";
import EmployeeView from "./components/Employee/EmployeeView";
import EmployeeEdit from "./components/Employee/EmployeeEdit";
import AddSalarys from "./components/Salary/AddSalary";
import SalaryList from "./components/Salary/SalaryList";
// import EmployeeProfile from './components/EmployeeDashboard/EmployeeProfile';
import Login from "./pages/Login";
import "./index.css";

import NewLeave from "./components/Leave/AddLeave";
import LeaveList from "./components/Leave/LeaveList";
import LeaveTable from "./components/Leave/LeaveTable";
import ViewLeaves from "./components/Leave/ViewLeaves";

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
