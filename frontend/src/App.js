import React from "react";
import { AuthProvider } from "./context/AuthContext"; // Provide authentication state
import AppRoutes from "./routes/AppRoutes"; // Import routes for navigation

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes /> {/* Handle routing for Login and Dashboard */}
      </div>
    </AuthProvider>
  );
};

export default App;

