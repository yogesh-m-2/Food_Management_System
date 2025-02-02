import { useNavigate } from 'react-router-dom';
import '../../styles/login/Login.css';
import { FaUserTie, FaUsers, FaProcedures, FaMotorcycle, FaUtensils, FaStethoscope } from 'react-icons/fa';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (type) => {
    navigate(`/${type.toLowerCase()}`);
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
        <div className="login-option" onClick={() => handleLogin('Patient')}>
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
