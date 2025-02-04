import { Routes, Route } from "react-router-dom";
import DeliveryLogin from "../../pages/Delivery/DeliveryLogin";

const DeliveryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DeliveryLogin />} />
    </Routes>
  );
};

export default DeliveryRoutes;
