import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './components/navigation/Navigation';
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <Router>
      <Navigation />
      <AppRoutes />
    </Router>
  );
};

export default App;
