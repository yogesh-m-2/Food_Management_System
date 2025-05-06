import { useNavigate } from 'react-router-dom';
import '../../styles/login/Login.css';
import { FaUserTie, FaUsers, FaProcedures, FaMotorcycle, FaUtensils, FaStethoscope } from 'react-icons/fa';
import api from '../../services/api';
const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (type) => {
    navigate(`/${type.toLowerCase()}`);
  };

  const handlePatienLogin = (type) => {
    const Patient_Auto_Login = async () => {
      try {
        const response = await api.post("/authenticate/patient", { "uhid":"Public" });
        if (response.data.jwt) {
          localStorage.setItem("jwtToken", response.data.jwt);
          navigate("/patient/order");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Failed to login. Please check your UHID.");
        navigate(`/${type.toLowerCase()}`);
      }
    };
    Patient_Auto_Login()
  };
  return (
    <div className="login-container">
      <div className="login-grid">
        <div className="login-option admin" onClick={() => handleLogin('Admin')}>
          <FaUserTie className="icon" />
          <span>Admin</span>
        </div>
        <div className="login-option" onClick={() => handleLogin('Staff')}>
          <FaUsers className="icon" />
          <span>Staff</span>
        </div>
        <div className="login-option" onClick={() => handlePatienLogin('Patient')}>
          <FaProcedures className="icon" />
          <span>Patient</span>
        </div>
        <div className="login-option" onClick={() => handleLogin('Dietitian')}>
          <FaStethoscope className="icon" />
          <span>Dietitian</span>
        </div>
        <div className="login-option" onClick={() => handleLogin('Delivery')}>
          <FaMotorcycle className="icon" />
          <span>Delivery</span>
        </div>
        <div className="login-option" onClick={() => handleLogin('Kitchen')}>
          <FaUtensils className="icon" />
          <span>Kitchen</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
