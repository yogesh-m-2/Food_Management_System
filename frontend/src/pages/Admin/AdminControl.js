import React, { useState } from "react";
import "../../styles/admin/AdminControl.css";
import MenuManagement from "./MenuManagement"; // Import the MenuManagement component
import StaffManagement from "./StaffManagement"; // Import the StaffManagement component
import PatientManagement from "./PatientManagement";
import DietitianManagement from "./DietitianManagement";
import DeliveryManagement from "./DeliveryManagement";
const sections = ["Menu", "Staff","Patient","Dietitian", "Delivery"];

const AdminControl = () => {
  const [activeSection, setActiveSection] = useState("Menu");

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        {sections.map((section) => (
          <button
            key={section}
            className={activeSection === section ? "active" : ""}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      <div className="content">
        <h2>{activeSection} Management</h2>
        {activeSection === "Menu" && <MenuManagement />} {/* Render MenuManagement when 'Menu' is active */}
        {activeSection === "Staff" && <StaffManagement />} {/* Render StaffManagement when 'Staff' is active */}
        {activeSection === "Patient" && <PatientManagement />}
        {activeSection === "Dietitian" && <DietitianManagement/>}
        {activeSection === "Delivery" && <DeliveryManagement/>}
      </div>
    </div>
  );
};

export default AdminControl;
