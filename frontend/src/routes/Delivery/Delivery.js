import { Routes, Route } from "react-router-dom";
import DeliveryLogin from "../../pages/Delivery/DeliveryLogin";
import DeliveryDashboard from "../../pages/Delivery/DeliveryDashboard";

const DeliveryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DeliveryLogin />} />
      <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
    </Routes>
  );
};

export default DeliveryRoutes;
