import { Routes, Route } from "react-router-dom";

import Patient from '../../pages/Patient/PatientLogin';

const PatientRoutes = () => {
    return (

<Routes>
        <Route path="/" element={<Patient />} />
      </Routes>

);
};


export default PatientRoutes;