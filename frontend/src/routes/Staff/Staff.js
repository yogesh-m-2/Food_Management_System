import { Routes, Route } from "react-router-dom";


import StaffLogin from "../../pages/Staff/StaffLogin";
import StaffOrder from "../../pages/Staff/StaffOrder";
import CheckoutOrder from "../../pages/Staff/OrderChechout";
import OrderSuccess from "../../components/OrderStatus/OrderSuccess";
import OrderHistory from "../../components/OrderHistory/OrderHistory";

const StaffRoutes = () => {
    return (

<Routes>
        <Route path="/" element={<StaffLogin />} />
        <Route path="/order" element={<StaffOrder />} />
        <Route path="/checkout" element={<CheckoutOrder />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
      </Routes>

);
};


export default StaffRoutes;