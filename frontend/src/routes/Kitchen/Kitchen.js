import { Routes, Route } from "react-router-dom";
import KitchenLogin from "../../pages/Kitchen/KitchenLogin";
import KitchenDashboard from "../../pages/Kitchen/KitchenDashboard";
const KitchenRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<KitchenLogin />} />
      <Route path="/kitchen-dashboard" element={<KitchenDashboard />} />
    </Routes>
  );
};

export default KitchenRoutes;
