import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './components/navigation/Navigation';
import AppRoutes from "./AppRoutes";
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Navigation />
      <AppRoutes />
    </Router>
    </AuthProvider>
  );
};

export default App;
