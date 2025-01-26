import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routeConfig from "./routeConfig";
import { useAuth } from "../context/AuthContext";

// PrivateRoute wrapper for protected routes
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routeConfig.map(({ path, element, isPrivate }, index) => (
          <Route
            key={index}
            path={path}
            element={isPrivate ? <PrivateRoute element={element} /> : element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
