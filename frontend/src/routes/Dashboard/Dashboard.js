import { Routes, Route } from "react-router-dom";

import DashboardPage from '../../components/DashboardPage';

const DashboardRoutes = () => {
    return (

<Routes>
<Route path="/" element={<DashboardPage />} />
      </Routes>

);
};


export default DashboardRoutes;