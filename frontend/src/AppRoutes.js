import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home";
import DashboardPage from "./routes/Dashboard/Dashboard";
import Admin from "./routes/Admin/Admin";
import Staff from "./routes/Staff/Staff";
import Patient from "./routes/Patient/Patient";

const AppRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("jwtToken"); // Check if user is authenticated
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Protected Routes - Redirects unauthorized users to /admin */}
      <Route path="/dashboard/*" element={isAuthenticated  ? <DashboardPage /> : <Navigate to="/admin" />} />
      <Route path="/staff/*" element={isAuthenticated || location.pathname === "/staff" ? <Staff /> : <Navigate to="/staff" />} />
      <Route path="/patient/*" element={isAuthenticated || location.pathname === "/patient" ? <Patient /> : <Navigate to="/patient" />} />
      <Route path="/admin/*" element={isAuthenticated || location.pathname === "/admin" ? <Admin /> : <Navigate to="/admin" />} />
    </Routes>
  );
};

export default AppRoutes;
