import { Routes, Route } from "react-router-dom";
import DietitianLogin from '../../pages/Dietitian/DietitianLogin';
import DietitianDashboard from "../../pages/Dietitian/DietitianDashboard";
import Wards from "../../pages/Dietitian/Wards";
import Rooms from "../../pages/Dietitian/Rooms";
import Beds from "../../pages/Dietitian/Beds";
import PatientDetails from "../../pages/Dietitian/PatientDetails";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import CreateDiet from "../../pages/Dietitian/CreateDiet";
import DietitianOrderCheckout from "../../pages/Dietitian/DietitianOrderCheckout";
import OrderSucces from "../../components/OrderStatus/OrderSuccess";

const DietitianRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DietitianLogin />} />
            <Route path="/dietitian-dashboard" element={<DietitianDashboard />} />
            {/* <Route path="/floors" element={<Floors />} /> */}
            <Route path="/wards/:floor" element={<Wards />} />
            <Route path="/rooms/:floor/:ward" element={<Rooms />} />
            <Route path="/beds/:floor/:ward/:room" element={<Beds />} />
            <Route path="/patient/:floor/:ward/:room/:bed" element={<PatientDetails />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/create-diet" element={<CreateDiet />} />
            <Route path="/checkout" element={<DietitianOrderCheckout />} />
            <Route path="/order-success" element={<OrderSucces />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            
            
            
        </Routes>
    );
};

export default DietitianRoutes;
