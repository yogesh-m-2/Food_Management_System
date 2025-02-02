
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home';
import DashboardPage from './routes/Dashboard/Dashboard';
import Admin from './routes/Admin/Admin'


const AppRoutes = () => {
    return (

<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>

);
};

export default AppRoutes;