
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home';
import DashboardPage from './routes/Dashboard/Dashboard';
import Admin from './routes/Admin/Admin'
import Staff from './routes/Staff/Staff'

const AppRoutes = () => {
    return (

<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/staff/*" element={<Staff />} />
      </Routes>

);
};

export default AppRoutes;