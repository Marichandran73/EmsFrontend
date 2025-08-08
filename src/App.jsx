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
import DepartmentList from './components/Department/DepartmentList';
import AddDepartment from './components/Department/AddDepartment';
import EditDepartment from './components/Department/EditDepartment';
import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';
import EmployeeView from './components/Employee/EmployeeView';
import EmployeeEdit from './components/Employee/EmployeeEdit';

import AddSalarys from './components/Salary/AddSalary';
import SalaryList from './components/Salary/SalaryList';

import EmployeeProfile from './components/EmployeeDashboard/EmployeeProfile';




import Login from "./pages/Login";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/login" element={<Login />} />
         <Route path="/admin-dashboard" 
  element={
    <PrivateRoutes>
      <RoleBasedRoute requiredRoles={['admin']}>
        <AdminDashboard />
      </RoleBasedRoute>
    </PrivateRoutes>
  }
>
  <Route index element={<AdminSummary />} />

  <Route path="/admin-dashboard/departmentList" element={<DepartmentList />} />
  <Route path="/admin-dashboard/Add-department" element={<AddDepartment />} />
  <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />
  
  <Route path="/admin-dashboard/EmployeeList" element={<EmployeeList />} />
  <Route path="/admin-dashboard/add-employee" element={<AddEmployee />} />
  <Route path="/admin-dashboard/employee/:id" element={<EmployeeView />} />
  <Route path="/admin-dashboard/employee/Edit/:id" element={<EmployeeEdit/>} />


  <Route path="/admin-dashboard/Add-Salary" element={<AddSalarys/>} />
  <Route path="/admin-dashboard/employee/Salary/:id" element={<SalaryList/>} />
</Route>

<Route path="/employee-dashboard" element={
  <PrivateRoutes >
    <RoleBasedRoute requiredRoles={['admin','employe']}>
              <EmployeDashboard />
   </RoleBasedRoute>
  </PrivateRoutes>} >

  
  <Route path="/employee-dashboard/EmployeeProfile/:id" element={<EmployeeProfile />} />
  
  </Route> 
 
        </Routes>
      </Router>
    </>
  );
}

export default App;
