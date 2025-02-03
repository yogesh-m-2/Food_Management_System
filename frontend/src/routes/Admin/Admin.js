import { Routes, Route } from "react-router-dom";

import Admin from '../../pages/Admin/AdminLogin';
import AdminControl from "../../pages/Admin/AdminControl";


const AdminRoutes = () => {
    return (

<Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/control" element={<AdminControl />} />
      </Routes>

);
};


export default AdminRoutes;