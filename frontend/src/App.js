import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/landingPage/LandingPage';
import DashboardPage from './components/DashboardPage';
import Admin from './components/admin/AdminLogin';
import Navigation from './components/navigation/Navigation';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
