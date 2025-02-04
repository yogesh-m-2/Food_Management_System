import { Routes, Route } from "react-router-dom";


import StaffLogin from "../../pages/Staff/StaffLogin";
import StaffOrder from "../../pages/Staff/StaffOrder";

const StaffRoutes = () => {
    return (

<Routes>
        <Route path="/" element={<StaffLogin />} />
        <Route path="/order" element={<StaffOrder />} />
      </Routes>

);
};


export default StaffRoutes;