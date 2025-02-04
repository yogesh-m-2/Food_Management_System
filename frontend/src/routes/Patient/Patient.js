import { Routes, Route } from "react-router-dom";

import Patient from '../../pages/Patient/PatientLogin';
import PatientOrder from "../../pages/Patient/PatientOrder";
import PatientOrderCheckout from "../../pages/Patient/PatientOrderCheckout";
import OrderSuccess from "../../components/OrderStatus/OrderSuccess";
import OrderHistory from "../../components/OrderHistory/OrderHistory";

const PatientRoutes = () => {
    return (

<Routes>
        <Route path="/" element={<Patient />} />
        <Route path="/order" element={<PatientOrder />} />
        <Route path="/checkout" element={<PatientOrderCheckout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
      </Routes>

);
};


export default PatientRoutes;