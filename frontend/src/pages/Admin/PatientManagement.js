import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Replace with your actual API instance

const initialPatientState = {
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
};

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState(initialPatientState);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patient/all");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const validatePatient = (patient) => {
    const requiredFields = [
      "name",
      "uhid",
      "age",
      "gender",
      "primaryConsultant",
      "diagnosisDescription",
      "admissionDateTime",
      "patientStatus",
      "roomNo",
      "bedNo",
      "floor",
      "ward",
      "patientMobileNo",
    ];

    for (let field of requiredFields) {
      if (!patient[field]) {
        alert(`Field "${field}" is required.`);
        return false;
      }
    }

    if (!/^\d{10}$/.test(patient.patientMobileNo)) {
      alert("Patient Mobile Number must be exactly 10 digits.");
      return false;
    }

    return true;
  };

  const handleAdd = async () => {
    if (!validatePatient(newPatient)) return;

    try {
      const response = await api.post("/patient/add", newPatient);
      setPatients([...patients, response.data.data]);
      setNewPatient(initialPatientState);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/patient/delete/${id}`);
      setPatients(patients.filter(patient => patient.id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient({ ...patient });
  };

  const handleUpdate = async () => {
    if (!validatePatient(editingPatient)) return;

    try {
      const response = await api.put(`/patient/update/${editingPatient.id}`, editingPatient);
      setPatients(patients.map(p => (p.id === editingPatient.id ? response.data.data : p)));
      setEditingPatient(null);
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updateState = (stateSetter, currentState) => {
      const updatedValue = (name.includes("DateTime") && value) ? value + ":00" : value;
      stateSetter({ ...currentState, [name]: updatedValue });
    };

    if (editingPatient) {
      updateState(setEditingPatient, editingPatient);
    } else {
      updateState(setNewPatient, newPatient);
    }
  };

  const renderForm = (patient, onChangeHandler, onSubmit, onCancel) => (
    <div className="modal">
      <div className="modal-content">
        <h3>{editingPatient ? "Edit Patient" : "Add New Patient"}</h3>
        <div className="form-columns">
          {[
            ["name", "Patient Name"],
            ["uhid", "UHID"],
            ["ipId", "In-Patient ID (Optional)"],
            ["age", "Age", "number"],
            ["gender", "Gender"],
            ["primaryConsultant", "Primary Consultant"],
            ["diagnosisDescription", "Diagnosis Description"],
            ["patientStatus", "Patient Status"],
            ["admissionDateTime", "Admission Time", "datetime-local"],
            ["dischargeDateTime", "Discharge Time", "datetime-local"],
            ["roomNo", "Room No"],
            ["bedNo", "Bed No"],
            ["floor", "Floor"],
            ["ward", "Ward"],
            ["patientMobileNo", "Mobile No"],
            ["attendantContact", "Attendant Contact (Optional)"],
          ].map(([name, placeholder, type = "text"]) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={
                patient[name]
                  ? type === "datetime-local"
                    ? patient[name].slice(0, 16)
                    : patient[name]
                  : ""
              }
              onChange={onChangeHandler}
            />
          ))}
        </div>
        <button onClick={onSubmit}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );

  return (
    <div className="patient-management">
      <button onClick={() => { setShowAddForm(true); setEditingPatient(null); }} className="add-btn">
        Add Patient
      </button>

      {showAddForm && renderForm(newPatient, handleChange, handleAdd, () => setShowAddForm(false))}

      {editingPatient && renderForm(editingPatient, handleChange, handleUpdate, () => setEditingPatient(null))}

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
