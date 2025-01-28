import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (type) => {
    navigate(`/${type.toLowerCase()}`);
  };

  return (
    <div className="login-container">
      <h2>Login to Neuro Foundation Canteen</h2>
      <div className="login-options">
        <button onClick={() => handleLogin('Admin')}>Admin</button>
        <button onClick={() => handleLogin('Staff')}>Staff</button>
        <button onClick={() => handleLogin('OPPatients')}>OP Patients</button>
        <button onClick={() => handleLogin('Dietitians')}>Dietitians</button>
        <button onClick={() => handleLogin('DeliveryBoy')}>Delivery Boy</button>
        <button onClick={() => handleLogin('Kitchen')}>Kitchen</button>
      </div>
    </div>
  );
};

export default LoginPage;