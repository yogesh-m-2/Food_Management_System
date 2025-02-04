import { Routes, Route } from "react-router-dom";
import DietitianLogin from '../../pages/Dietitian/DietitianLogin';

const DietitianRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DietitianLogin />} />
        </Routes>
    );
};

export default DietitianRoutes;
