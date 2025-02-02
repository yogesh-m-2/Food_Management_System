import { Routes, Route } from "react-router-dom";


import StaffLogin from "../../pages/Staff/StaffLogin";

const StaffRoutes = () => {
    return (

<Routes>
        <Route path="/" element={<StaffLogin />} />
      </Routes>

);
};


export default StaffRoutes;