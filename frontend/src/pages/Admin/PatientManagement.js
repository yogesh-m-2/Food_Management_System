import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Assuming you have an 'api' instance setup for Axios

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    uhid: "",
    patientMobileNo: "",
  });
  const [editingPatient, setEditingPatient] = useState(null); // For storing the patient being edited

  useEffect(() => {
    fetchPatients();
  }, []);

  // Fetching patients from the API
  const fetchPatients = async () => {
    try {
      const response = await api.get("/patient/all"); // Updated API endpoint
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Handle patient deletion
  const handleDelete = async (id) => {
    try {
      await api.delete(`/patient/delete/${id}`); // Updated API endpoint
      setPatients(patients.filter(patient => patient.id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  // Handle patient editing (show edit form)
  const handleEdit = (patient) => {
    setEditingPatient(patient); // Set the selected patient for editing
  };

  // Handle updating the patient details
  const handleUpdate = async () => {
    try {
      const response = await api.put(`/patient/update/${editingPatient.id}`, editingPatient);
      setPatients(patients.map((patient) => 
        patient.id === editingPatient.id ? response.data : patient
      ));
      setEditingPatient(null); // Clear the editing state
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  // Handle adding a new patient
  const handleAdd = async () => {
    try {
      const response = await api.post("/patient/add", newPatient); // Updated API endpoint
      setPatients([...patients, response.data]);
      setNewPatient({ name: "", uhid: "", patientMobileNo: "" }); // Reset form
      setShowAddForm(false); // Close the add form
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  // Handle change in form fields for adding or editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingPatient) {
      setEditingPatient({ ...editingPatient, [name]: value }); // Update editingPatient
    } else {
      setNewPatient({ ...newPatient, [name]: value }); // Update newPatient
    }
  };

  return (
    <div className="patient-management">
      
      {/* Add New Patient Button */}
      <button onClick={() => setShowAddForm(true)} className="add-btn">
        Add Patient
      </button>

      {/* Show Add New Patient Form */}
      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Patient</h3>
            <input
              type="text"
              name="name"
              placeholder="Patient Name"
              value={newPatient.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="uhid"
              placeholder="UHID"
              value={newPatient.uhid}
              onChange={handleChange}
            />
            <input
              type="text"
              name="patientMobileNo"
              placeholder="Contact"
              value={newPatient.patientMobileNo}
              onChange={handleChange}
            />
            <button onClick={handleAdd}>Save</button>
            <button onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Show Edit Patient Form if a patient is being edited */}
      {editingPatient && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Patient</h3>
            <input
              type="text"
              name="name"
              placeholder="Patient Name"
              value={editingPatient.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="uhid"
              placeholder="UHID"
              value={editingPatient.uhid}
              onChange={handleChange}
            />
            <input
              type="text"
              name="patientMobileNo"
              placeholder="Contact"
              value={editingPatient.patientMobileNo}
              onChange={handleChange}
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setEditingPatient(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Patient Table */}
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>UHID</th>
            <th>Contact</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.uhid}</td>
              <td>{patient.patientMobileNo}</td>
              <td>
                <button onClick={() => handleEdit(patient)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(patient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientManagement;
