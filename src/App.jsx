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
</Route>
 <Route path="/employe-dashboard" element={<EmployeDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
