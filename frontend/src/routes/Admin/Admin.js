import { Routes, Route } from "react-router-dom";

import Admin from '../../pages/Admin/AdminLogin';

const AdminRoutes = () => {
    return (

<Routes>
        <Route path="/" element={<Admin />} />
      </Routes>

);
};


export default AdminRoutes;