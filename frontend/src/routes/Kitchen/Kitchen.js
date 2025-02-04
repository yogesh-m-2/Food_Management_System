import { Routes, Route } from "react-router-dom";
import KitchenLogin from "../../pages/Kitchen/KitchenLogin";

const KitchenRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<KitchenLogin />} />
    </Routes>
  );
};

export default KitchenRoutes;
