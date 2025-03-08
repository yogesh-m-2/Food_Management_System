import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Assuming you have an 'api' instance setup for Axios

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    uhid: "",
    ipId: "",
    age: 0,
    gender: "",
    primaryConsultant: "",
    diagnosisDescription: "",
    admissionDateTime: null,
    dischargeDateTime: null,
    patientStatus: "",
    roomNo: "",
    bedNo: "",
    floor: "",
    ward: "",
    patientMobileNo: "",
    attendantContact: "",
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
      setNewPatient({
        name: "",
        uhid: "",
        ipId: "",
        age: 0,
        gender: "",
        primaryConsultant: "",
        diagnosisDescription: "",
        admissionDateTime: null,
        dischargeDateTime: null,
        patientStatus: "",
        roomNo: "",
        bedNo: "",
        floor: "",
        ward: "",
        patientMobileNo: "",
        attendantContact: "",
      }); // Reset form
      setShowAddForm(false); // Close the add form
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  // Handle change in form fields for adding or editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingPatient) {
      if (name === "admissionDateTime" || name === "dischargeDateTime") {
        setEditingPatient({ ...editingPatient, [name]: value + ":00" }); // Update editingPatient with time
      } else {
        setEditingPatient({ ...editingPatient, [name]: value }); // Update editingPatient
      }
    } else {
      if (name === "admissionDateTime" || name === "dischargeDateTime") {
        setNewPatient({ ...newPatient, [name]: value + ":00" }); // Update newPatient with time
      } else {
        setNewPatient({ ...newPatient, [name]: value }); // Update newPatient
      }
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
            <div className="form-columns">
              <div className="form-column">
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
                  name="ipId"
                  placeholder="In-Patient ID"
                  value={newPatient.ipId}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={newPatient.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form-column">
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={newPatient.gender}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="primaryConsultant"
                  placeholder="Primary Consultant"
                  value={newPatient.primaryConsultant}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="diagnosisDescription"
                  placeholder="Diagnosis Description"
                  value={newPatient.diagnosisDescription}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="patientStatus"
                  placeholder="Patient Status"
                  value={newPatient.patientStatus}
                  onChange={handleChange}
                />
              </div>
              <div className="form-column">
                <input
                  type="datetime-local"
                  name="admissionDateTime"
                  value={newPatient.admissionDateTime ? newPatient.admissionDateTime.slice(0, 16) : ""}
                  onChange={handleChange}
                />
                <input
                  type="datetime-local"
                  name="dischargeDateTime"
                  value={newPatient.dischargeDateTime ? newPatient.dischargeDateTime.slice(0, 16) : ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="roomNo"
                  placeholder="Room No"
                  value={newPatient.roomNo}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="bedNo"
                  placeholder="Bed No"
                  value={newPatient.bedNo}
                  onChange={handleChange}
                />
              </div>
              <div className="form-column">
                <input
                  type="text"
                  name="floor"
                  placeholder="Floor"
                  value={newPatient.floor}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="ward"
                  placeholder="Ward"
                  value={newPatient.ward}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="patientMobileNo"
                  placeholder="Contact"
                  value={newPatient.patientMobileNo}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="attendantContact"
                  placeholder="Attendant Contact"
                  value={newPatient.attendantContact}
                  onChange={handleChange}
                />
              </div>
            </div>
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
            <div className="form-columns">
              <div className="form-column">
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
                  name="ipId"
                  placeholder="In-Patient ID"
                  value={editingPatient.ipId}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={editingPatient.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form-column">
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={editingPatient.gender}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="primaryConsultant"
                  placeholder="Primary Consultant"
                  value={editingPatient.primaryConsultant}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="diagnosisDescription"
                  placeholder="Diagnosis Description"
                  value={editingPatient.diagnosisDescription}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="patientStatus"
                  placeholder="Patient Status"
                  value={editingPatient.patientStatus}
                  onChange={handleChange}
                />
              </div>
              <div className="form-column">
                <input
                  type="datetime-local"
                  name="admissionDateTime"
                  value={editingPatient.admissionDateTime ? editingPatient.admissionDateTime.slice(0, 16) : ""}
                  onChange={handleChange}
                />
                <input
                  type="datetime-local"
                  name="dischargeDateTime"
                  value={editingPatient.dischargeDateTime ? editingPatient.dischargeDateTime.slice(0, 16) : ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="roomNo"
                  placeholder="Room No"
                  value={editingPatient.roomNo}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="bedNo"
                  placeholder="Bed No"
                  value={editingPatient.bedNo}
                  onChange={handleChange}
                />
              </div>
              <div className="form-column">
                <input
                  type="text"
                  name="floor"
                  placeholder="Floor"
                  value={editingPatient.floor}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="ward"
                  placeholder="Ward"
                  value={editingPatient.ward}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="patientMobileNo"
                  placeholder="Contact"
                  value={editingPatient.patientMobileNo}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="attendantContact"
                  placeholder="Attendant Contact"
                  value={editingPatient.attendantContact}
                  onChange={handleChange}
                />
              </div>
            </div>
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
